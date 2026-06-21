const express = require("express");
const appointmentController = require("../Controllers/appointmentController");
const isAuth = require("../Middlewares/isAuth"); // ✅ isAuth Import kiya
const rateLimiter = require("../Middlewares/rateLimiter");

const appointmentRoute = express.Router();
appointmentRoute.post(
  "/getAppointmentInfo",
  isAuth,
  rateLimiter.bookingLimiter,
  appointmentController.getAppointmentInfo,
);
appointmentRoute.post(
  "/sendAppointmentInfo",
  isAuth,

  appointmentController.sendAppointmentInfo,
);
appointmentRoute.get("/:id", isAuth, appointmentController.getAppointmentById);
//for resheduling appointment data//
appointmentRoute.post("/reshedule", isAuth, appointmentController.reshedule);
//for calcel appointment
appointmentRoute.post(
  "/cancel",
  isAuth,
  appointmentController.cancelAppointment,
);

module.exports = appointmentRoute;
