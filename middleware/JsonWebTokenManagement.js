import { response } from "express";
import jwt from "jsonwebtoken";
import USER from "../models/userModel.js";
var key = "shhhhhhhhclave";
var user = new USER();
class JsonWebTokenManagement {
  constructor() {}
  //genera el token
  //previa validacion de datos verificar si es un usuario registrado
  sign(params) {
    return jwt.sign(
      { data: params, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      key
    );
  }
  //consulta a la base de datos

  async middleware(request, response, next) {
    console.log(this);
    const token = request.headers["authorization"];
    if (token == null) {
      response.status(200).json({
        serverResponse: "No cuenta con la autorizacion a este endpoint",
      });
      return;
    }
    console.log("Check verify");

    jwt.verify(token, key, async (err, payload) => {
      if (err) {
        response.status(200).json(err);
        return;
      }
      var { data } = payload;
      var list = await user.getUsers({ _id: data.id });
      var services = request.originalUrl.substr(1, 100);
      if (services.lastIndexOf("?") > -1) {
        services = services.substring(0, services.lastIndexOf("?"));
      }
      if (list.length == 1) {
        const user = list[0];
        for (var i = 0; i < user.roles.length; i++) {
          var item = user.roles[i];
          var reg = new RegExp(services, "i");
          //console.log(item.method.toUpperCase() + " = " + request.method);
          //console.log(item.endpoint + "=" + services);
          if (
            item.endpoint.match(reg) != null &&
            item.method.toUpperCase() == request.method
          ) {
            next();
            return;
          }
        }
      }
      response.status(200).json({ serverResponse: "Usuario sin permiso" });
      return;
    });
  }
}
export default JsonWebTokenManagement;
