import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//console.log(process.env.IPHOSTDB+" "+process.env.PORTDB+" "+process.env.NAMEDB+"*****");
mongoose.connect(
  `mongodb://${process.env.IPHOSTDB}:${process.env.PORTDB}/${process.env.NAMEDB}`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);
const db = mongoose.connection;
db.on("error", () => {
  console.log("No se puede conectar con la base de datos ****");
});
db.on("open", () => {
  console.log("Conexion exitosa");
});
export default mongoose;
