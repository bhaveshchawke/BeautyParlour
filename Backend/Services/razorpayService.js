const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpayInstance = new Razorpay({
  key_id: process.env.LIVE_RAZORPAY_KEY_ID,
  key_secret: process.env.LIVE_RAZORPAY_KEY_SECRET,
});

// Service 1: Order Create karna
const generateRazorpayOrder = async (amount, receiptId) => {
  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: receiptId,
    };
    return await razorpayInstance.orders.create(options);
  } catch (error) {
    throw new Error("Razorpay order creation failed: " + error.message);
  }
};

// Service 2: Signature Verify karna
const verifyRazorpaySignature = (order_id, payment_id, signature) => {
  const sign = order_id + "|" + payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.LIVE_RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  return signature === expectedSign; // Returns true or false
};

module.exports = {
  generateRazorpayOrder,
  verifyRazorpaySignature,
};
