const express = require("express");
const authRoute = express.Router();
const authController = require("../Controllers/authController");
const isAuth = require("../Middlewares/isAuth");
const rateLimiter = require("../Middlewares/rateLimiter");
// for register page//
authRoute.post(
  "/register",
  rateLimiter.registerLimiter,
  authController.getRegisterPageData,
);
authRoute.post("/verifyOtp", rateLimiter.otpLimiter, authController.verifyOtp);
//for login page//
authRoute.post(
  "/getlogindata",
  rateLimiter.loginLimiter,
  authController.getlogindata,
);
//for sent userLogin info to ui//
authRoute.get("/me", isAuth, authController.getMe);
//for logout//
authRoute.post("/logout", isAuth, authController.logout);
module.exports = authRoute;
