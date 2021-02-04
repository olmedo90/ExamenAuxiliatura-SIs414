import mongoose from "../connection/connect.js";
import modelenum from "../utils/enumModel.js";
class RolesModel {
  constructor() {
    var Schema = mongoose.Schema;
    this.rolesSchema = new Schema({
      name: String,
      description: String,
      endpoint: String,
      method: String,
    });
    if (modelenum["roles"] == null) {
      this.mymodel = mongoose.model("roles", this.rolesSchema);
      modelenum["roles"] = this.mymodel;
    } else {
      this.mymodel = modelenum["roles"];
    }
  }
  getModel() {
    return this.mymodel;
  }
  getSchema() {
    return this.rolesSchema;
  }
  createRol(roldata) {
    var rol = new this.mymodel(roldata);
    return new Promise((resolve, reject) => {
      rol.save().then((docs) => {
        if (docs) {
          resolve(docs);
        }
      });
    });
  }
  async deleteRol(id) {
    const result = await this.mymodel.remove({ _id: id });
    return result;
  }
  async updateRol(id, updatedata) {
    const result = await this.mymodel.update({ _id: id }, { $set: updatedata });
    return result;
  }
  async getRol(key) {
    var filter = {};
    if (key != null) {
      filter = key;
    }
    const result = await this.mymodel.find(filter);
    console.log("---------- MODEL -----------");
    console.log(result);
    console.log("---------- END MODEL -----------");

    return result;
  }
}
export default RolesModel;
