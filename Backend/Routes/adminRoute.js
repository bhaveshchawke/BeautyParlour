const adminController = require("../Controllers/adminController");
const isAuth = require("../Middlewares/isAuth");
const isAdmin = require("../Middlewares/isAdmin");
const express = require("express");
const adminRoute = express.Router();
const upload = require("../Middlewares/multerMiddleware");

//for check is Admin or not//
adminRoute.get("/me", isAuth, isAdmin, adminController.isAdmin);
adminRoute.post(
  "/confirmed",
  isAuth,
  isAdmin,
  adminController.confirmedAppointments,
);
adminRoute.post("/cancel", isAuth, isAdmin, adminController.cancelAppointments);
adminRoute.post(
  "/completed",
  isAuth,
  isAdmin,
  adminController.completedAppointments,
);
adminRoute.post(
  "/addService",
  upload.single("image"),
  adminController.addServices,
);
// Update service route
adminRoute.put(
  "/editService/:id",
  isAuth,
  isAdmin,
  upload.single("image"),
  adminController.editService,
);
// Delete service route
adminRoute.delete(
  "/deleteservice/:id",
  isAuth,
  isAdmin,
  adminController.deleteService,
);
// Toggle service active status
adminRoute.post(
  "/isactive",
  isAuth,
  isAdmin,
  adminController.toggleServiceActive,
);

module.exports = adminRoute;
