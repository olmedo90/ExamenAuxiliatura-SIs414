import RolesModel from "../models/rolesModel.js";
var roles = new RolesModel();
class RolesController {
  constructor() {}
  async createRol(req, res) {
    var body = req.body;
    var result = await roles.createRol(body);
    res.status(200).json({ serverResponse: result });
  }
  async deleteRol(req, res) {
    var id = req.params.id;
    var result = await roles.deleteRol(id);
    res.status(200).json({ serverResponse: result });
  }
  async updateRol(req, res) {
    var id = req.params.id;
    var body = req.body;
    var result = await roles.updateRol(id, body);
    res.status(200).json({ serverResponse: result });
  }
  async getRol(req, res) {
    var key = null;
    var keysearch = null;
    if (req.params.key != null) {
      key = req.params.key;
      keysearch = {};
      keysearch["name"] = key;
    }

    console.log(keysearch);
    var result = await roles.getRol(keysearch);
    console.log("----------------ROLES CONTROLLER--------------------------");
    console.log(result);
    console.log("----------------END CONTROLLER--------------------------");
    res.status(200).json({ serverResponse: result });
  }
}
export default RolesController;
