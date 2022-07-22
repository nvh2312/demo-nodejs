var controllerInformation = require("../controllers/information");
var express = require("express");

var router = express.Router();

router.get("/", function (request, response, next) {
  response.render("informations");
});

router.post("/showList", controllerInformation.getInformation);
router.post("/add", controllerInformation.addInformation);
router.post("/fetch1", controllerInformation.fetchSingleInformation);
router.post("/edit", controllerInformation.editInformation);
router.post("/delete", controllerInformation.deleteInformation);
router.post("/default", controllerInformation.defaultInformation);


module.exports = router;
