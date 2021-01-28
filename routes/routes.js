import express from "express";
import IndexController from "../controller/indexController.js";
var router = express.Router();
var indexControler = new IndexController();
/* GET home page. */
router.get("/", indexControler.index);

export default router;
