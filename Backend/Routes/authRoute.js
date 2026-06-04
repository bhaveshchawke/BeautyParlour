const express = require("express");
const authRoute = express.Router();
const authController = require("../Controllers/authController");
authRoute.post("/register", authController.getRegisterPageData);
module.exports = authRoute;
