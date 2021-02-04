import UserModel from "../models/userModel.js";
import RolesModel from "../models/rolesModel.js";
var roles = new RolesModel();
var USER = new UserModel();
class UserController {
  constructor() {}
  //services
  async createUser(request, response) {
    var data = request.body;
    if (USER.checkEmaildb(data.email)) {
      response
        .status(200)
        .json({ serverResponse: "El email ya esta registrado" });
      return;
    }
    var result = await USER.createUser(
      data.name,
      data.lastname,
      data.email,
      data.password,
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
}
export default UserController;
