// userController
const cartModel = require("../Models/cartModel");
const orderModel = require("../Models/orderModel");
const Product = require("../Models/productModel");
const User = require("../Models/userModel");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const razorpayService = require("../Services/razorpayService"); // Service import ki

const deleteProductFromCart = async (req, res) => {
  const { id } = req.body;
  try {
    const isDelete = await cartModel.findByIdAndDelete(id);
    if (!isDelete) {
      return res.status(404).json({
        error: "something went wrong!",
      });
    }
    res.status(200).json({
      message: "item removed form cart.",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "something went wrong!",
    });
  }
};

//for creating order//
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const userId = req.session.userId; // Session se user ki identity lo

    // 👈 Pehle user ka data nikalo
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Cart is empty." });
    }

    // 1. Order create karo
    const order = new orderModel({
      userId,
      customerName: user.userName,
      customerPhone: user.phone,
      items,
      totalAmount,
      paymentStatus: "Pending",
    });
    const createdOrder = await order.save();

    // 2. Products ka Stock Quantity kam karo
    for (let item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stockQuantity: -item.quantity }, // Jitni quantity khareedi, utni minus kardo
      });
    }

    // 3. User ka pura Cart khali (empty) kar do
    await cartModel.deleteMany({ userId: userId });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: createdOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to place order." });
  }
};
const fetchOrder = async (req, res) => {
  try {
    const userIdString = String(req.session.userId);
    const orders = await orderModel
      .find({ userId: userIdString })
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
//fetching carts_______________________________________________________
const fetchCarts = async (req, res) => {
  try {
    const carts = await cartModel.find({ userId: req.session.userId });
    if (!carts) {
      return res.status(404).json({
        error: "cart not found!",
      });
    }
    res.status(200).json({
      success: true,
      data: carts,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      error: "something went wrong!",
    });
  }
};

//razorpay

//create order
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, receiptId } = req.body;

    // Service function ko call kiya
    const order = await razorpayService.generateRazorpayOrder(
      amount,
      String(receiptId),
    );

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//verify order____________________________________________________
const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      mongoOrderId,
    } = req.body;
    // Service function se verify karwaya (Boolean return karega)
    const isValid = razorpayService.verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    );
    if (isValid) {
      // DB me update kar diya
      await orderModel.findByIdAndUpdate(mongoOrderId, {
        paymentStatus: "Paid",
      });
      return res
        .status(200)
        .json({ success: true, message: "Payment verified!" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Fake/Invalid payment signature" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error during verification" });
  }
};
module.exports = {
  deleteProductFromCart,
  createOrder,
  fetchOrder,
  fetchCarts,
  createRazorpayOrder,
  verifyRazorpayPayment,
};
