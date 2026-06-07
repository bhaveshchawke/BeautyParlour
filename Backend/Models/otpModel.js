const mongoose = require("mongoose");

const otpModel = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // Yeh OTP 5 minute (300 seconds) baad automatically delete ho jayega
  },
});
module.exports = mongoose.model("otp", otpModel);
