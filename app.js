import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mustacheExpress from "mustache-express";
import indexRouter from "./routes/routes.js";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

const __dirname = "./";
var app = express();
dotenv.config();
// view engine setup

app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "views");
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err.message);
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
var port = 8000;
app.listen(port, () => {
  console.log("server running in " + port);
});
export default app;
