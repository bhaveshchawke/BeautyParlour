const serviceRouter = require("express").Router();
const serviceController = require("../Controllers/serviceController");
//_getAll_services__________________________________
serviceRouter.get("/getallservices", serviceController.gellAllServices);
module.exports = serviceRouter;
