import mongoose from "../connection/connect.js";
import modelenum from "../utils/enumModel.js";
import RolesModel from "./rolesModel.js";
class UserModel {
  constructor() {
    var roles = new RolesModel();
    this.Schema = mongoose.Schema;
    this.UserSchema = new this.Schema({
      name: String,
      lastname: String,
      fotosPerfil: [
        {
          uriAvatar: String, //la ruta de la imagen para http
          directorypath: String, //la ruta de donde se almacena la imagen en la servidor
          name: String,
          default: Boolean,
        },
      ],
      email: {
        type: String,
        validate: {
          validator: (value) => {
            return /^[\w\.]+@[\w\.]+\.\w{2,3}$/g.test(value);
          },
          message: (props) => `Este email de nombre ${props.value} es invalido`,
        },
      },
      password: String,
      registerDate: Date,
      age: {
        type: Number,
        min: 18,
      },
      roles: [roles.getSchema()],
    });
    //Ingresamos a llamar a la funcion model
    //this.mymodel = mongoose.model("users", this.UserSchema);
    if (modelenum["users"] == null) {
      this.mymodel = mongoose.model("users", this.UserSchema);
      modelenum["users"] = this.mymodel;
    } else {
      this.mymodel = modelenum["users"];
    }
  }
  /* 
  C. create
  */
  createUser(name, lastname, email, password, registerdate, age) {
    var user = {
      name,
      lastname,
      email,
      password,
      registerdate,
      age,
      roles: [],
    };
    var newuser = new this.mymodel(user);
    // aqui viene la validacion
    var error = newuser.validateSync();
    return new Promise((resolve, reject) => {
      if (error) {
        resolve(error);
        return;
      }
      newuser.save().then((docs) => {
        console.log("Usuario registrado");
        resolve(docs);
      });
    });
  }
  /* 
  R. read
  */
  getUsers(filterdata) {
    var filter = {};
    if (filterdata != null) {
      filter = filterdata;
    }
    return new Promise((resolve, reject) => {
      this.mymodel.find(filter, (err, docs) => {
        if (err) {
          console.log(err);
          resolve(err);
          return;
        }
        resolve(docs);
      });
    });
  }
  /*
  U. update
   */
  updateModel(id, userUpdate) {
    return new Promise((resolve, reject) => {
      this.mymodel.update({ _id: id }, { $set: userUpdate }, (err, docs) => {
        if (err) {
          console.log(err);
          resolve(err);
          return;
        }
        resolve(docs);
      });
    });
  }
  /*
  D. delete
   */
  deleteUser(id) {
    return new Promise((resolve, reject) => {
      this.mymodel.remove({ _id: id }).then((err, docs) => {
        if (err) {
          console.log(err);
          resolve(err);
          return;
        }
        resolve(docs);
      });
    });
  }
  getModel() {
    return this.mymodel;
  }
  getSchema() {
    return this.UserSchema;
  }
  async checkEmaildb(email) {
    var result = await this.mymodel.find({ email: email });

    if (result.length > 0) {
      return true;
    }
    return false;
  }
  async addRol(id, rol) {
    var result = await this.mymodel.update(
      { _id: id },
      { $push: { roles: rol } }
    );
    return result;
  }
  async updateAvatar(id, obj) {
    var result = await this.mymodel.update(
      { _id: id },
      { $push: { fotosPerfil: obj } }
    );
    return result;
  }
  async findAvatar(name) {
    var avatarImages = await this.mymodel.find({ "fotosPerfil.name": name });
    if (avatarImages != null && avatarImages.length > 0) {
      var avatarimage = avatarImages[0];
      var resuldata = avatarimage.fotosPerfil.filter((item) => {
        if (item.name == name) {
          return true;
        }
        return false;
      });
      return resuldata;
    }
    return [];
  }
}
export default UserModel;
