var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/getnorad", (req, res) => {});
router.post("/storemodel", (req, res) => {});
router.post("/createreport", (req, res) => {});
module.exports = router;
