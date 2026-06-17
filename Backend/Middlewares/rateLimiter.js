const rateLimit = require("express-rate-limit");

// rate limiter for Login count //
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    error: "Too many login attempts. Please try again after 10 minutes.",
  },
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
});
// rate limiter for otp //
const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    error: "Too many OTP attempts. Please try again after 10 minutes.",
  },
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
});
// Register limiter (OTP email abuse se bachao)
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Sirf 3 baar register attempt
  message: {
    error: "Too many accounts created. Please try again after 1 hour.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
module.exports = {
  loginLimiter,
  otpLimiter,
  registerLimiter,
};
