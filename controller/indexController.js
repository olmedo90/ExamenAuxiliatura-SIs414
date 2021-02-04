import UserModel from "../models/userModel.js";
var USER = new UserModel();
class IndexController {
  constructor() {}
  //services
  index(request, response) {
    response.status(200).json({ msn: "Api Test v. 2.0" });
  }
}
export default IndexController;
