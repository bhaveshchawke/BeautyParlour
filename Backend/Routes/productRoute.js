const productController = require("../Controllers/productController");
const isAuth = require("../Middlewares/isAuth");
const productRouter = require("express").Router();
//deleting cart item
productRouter.post(
  "/deleteproductfromcart",
  isAuth,
  productController.deleteProductFromCart,
);
//creating order
productRouter.post("/create", isAuth, productController.createOrder);
//fetching orders for user______________________________________
productRouter.get("/fetchorders", isAuth, productController.fetchOrder);
//fetching carts for user______________________________________
productRouter.get("/fetchcarts", isAuth, productController.fetchCarts);
// Razorpay routes
productRouter.post("/create-razorpay-order", isAuth, productController.createRazorpayOrder);
productRouter.post("/verify-payment", isAuth, productController.verifyRazorpayPayment);
module.exports = productRouter;
