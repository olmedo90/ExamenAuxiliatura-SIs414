import mongoose from "mongoose";
mongoose.connect("mongodb://172.31.0.2:27017/restorant", {
  useNewUrlParser: true,
});
var db = mongoose.connection;
db.on("error", () => {
  console.log("No se puede conectar con la base de datos");
});
db.on("open", () => {
  console.log("Conexion exitosa");
});
export default mongoose;
