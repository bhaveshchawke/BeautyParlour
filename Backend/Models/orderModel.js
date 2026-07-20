const mongoose = require("mongoose");

// Order mein ek item kaisa dikhega (Inner Schema)
const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // ZAROORI: Jisne order kiya!
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    items: [orderItemSchema],                 // Khareede gaye items
    totalAmount: { type: Number, required: true },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Cash on Delivery"],
      default: "Pending",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
