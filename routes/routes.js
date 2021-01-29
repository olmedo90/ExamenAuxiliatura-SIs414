import express from "express";
import IndexController from "../controller/indexController.js";
var router = express.Router();
var indexControler = new IndexController();
/* GET home page. */
router.get("/", indexControler.index);
router.post("/plus", indexControler.plus);
router.post("/ecuation", indexControler.ecuationSolve);
//ecuationSolveImg
router.post("/ecuationimg", indexControler.ecuationSolveImg);

export default router;
