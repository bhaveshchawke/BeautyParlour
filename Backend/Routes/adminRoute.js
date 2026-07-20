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
//get all usersData
adminRoute.get("/getallusers", isAuth, isAdmin, adminController.getallusers);
//add product

adminRoute.post(
  "/addproduct",
  isAuth,
  isAdmin,
  upload.single("image"),
  adminController.addProduct,
);
//for fetch all products_________________________________________________________
adminRoute.get("/fetchproducts", adminController.getallProducts);
//for update product _____________________________________________________________
adminRoute.post(
  "/updateproduct",
  isAuth,
  isAdmin,
  upload.single("productImage"),
  adminController.updateProduct,
);
//for delete product
adminRoute.post(
  "/deleteproduct",
  isAuth,
  isAdmin,

  adminController.deleteProduct,
);
// for added to cart
adminRoute.post(
  "/addtocart",
  isAuth,

  adminController.addToCart,
);
//for fetching cart items by id
adminRoute.get(
  "/fetchcarts",
  isAuth,

  adminController.fetchCarts,
);
// toogle product status  in shopmanagement
adminRoute.post(
  "/toogleproductptatus",
  isAuth,
  isAdmin,
  adminController.toogleProductStatus,
);

//for fetching orders
adminRoute.get(
  "/fetchorders",
  isAuth,
  isAdmin,
  adminController.fetchOrders,
);

// update order status
adminRoute.put(
  "/update-order-status",
  isAuth,
  isAdmin,
  adminController.updateOrderStatus,
);

module.exports = adminRoute;
