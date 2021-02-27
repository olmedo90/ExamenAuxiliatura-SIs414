import UserModel from "../models/userModel.js";
import RolesModel from "../models/rolesModel.js";
import Sha1 from "sha1";
import empty from "is-empty";
var roles = new RolesModel();
var USER = new UserModel();
class UserController {
  constructor() {}
  //services
  async createUser(request, response) {
    var data = request.body;
    if (!USER.checkEmaildb(data.email)) {
      response
        .status(200)
        .json({ serverResponse: "El email ya esta registrado" });
      return;
    }
    var result = await USER.createUser(
      data.name,
      data.lastname,
      data.email,
      Sha1(data.password),
      new Date(),
      data.age
    );
    response.status(200).json(result);
  }

  async getUsers(request, response) {
    var result = await USER.getUsers();
    response.status(200).json(result);
  }
  async updateUser(request, response) {
    var id = request.params.id;
    var updatedata = request.body;
    var result = await USER.updateModel(id, updatedata);
    response.status(200).json(result);
  }
  async deleteUser(request, response) {
    var id = request.params.id;
    var result = await USER.deleteUser(id);
    response.status(200).json(result);
  }
  async addRol(req, res) {
    var body = req.body;
    var idrol = body.idrol;
    var idus = body.idus;
    var filter = { _id: idrol };
    var rolresult = await roles.getRol(filter);
    if (rolresult.length == 1) {
      var result = await USER.addRol(idus, rolresult[0]);
      res.status(200).json({ serverResponse: result });
      return;
    }
    res.status(200).json({ serverResponse: "EL rol no pudo se asignado" });
  }
  async uploadAvatar(req, res) {
    var id = req.params.id;
    if (id == null) {
      res
        .status(200)
        .json({ serverResponse: "ERROR es necesario el id de usuario" });
      return;
    }
    if (!empty(req.files)) {
      //existen archivos en la peticion request
      var files = req.files;
      var file = files.avatar;
      var date = new Date();
      var token = Sha1(date.toString()).substr(0, 5);
      var totalname = `${token}_${file.name}`;
      var toalpath = `/opt/app/files/${totalname}`;
      var result = await file.mv(toalpath, (err) => {
        if (err) {
          res
            .status(500)
            .json({ serverResponse: "ERROR AL COPIAR LA IMAGEN", error: err });
          return;
        }
      });
      var obj = {};
      obj["uriAvatar"] = `/showavatar/${totalname}`;
      obj["directorypath"] = toalpath;
      obj["name"] = totalname;
      obj["default"] = true;
      var r = await USER.updateAvatar(id, obj);
      res.status(200).json({ serverResponse: r });
      //Upload Images Work
    }
  }
  async getAvatar(req, res) {
    //En caso de un servidor
    var name = req.params.name;
    /*var name = req.params.name;
    res.sendFile("/opt/app/files/" + name);*/
    // REvisar la base de datos
    var filtro = await USER.findAvatar(name);
    if (filtro.length == 1) {
      res.sendFile(filtro[0].directorypath);
      return;
    }
    res.sendFile("/opt/app/img/error.jpg");
  }
}
export default UserController;
