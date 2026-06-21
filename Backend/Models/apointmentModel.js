const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    // Jis user ne book kiya hai uska reference (ye session se aayega)
    userId: {
      type: String,
      ref: "user",
      required: true,
    },
    // User ka naam jo form me fill kiya gaya hai
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    // Form wala phone number
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    // Select Service wala option
    service: {
      type: String,
      required: true,
    },
    // Choose Date wala option
    date: {
      type: String, // String me 'YYYY-MM-DD' save kar sakte hain
      required: true,
    },
    // Select Time Slot wala option
    timeSlot: {
      type: String,
      required: true,
    },
    // Appointment ki current state
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "confirmed", // Default confirmed rakh sakte hain abhi ke liye
    },
  },
  { timestamps: true }, // Ye apne aap createdAt aur updatedAt dates add kar dega
);

module.exports = mongoose.model("appointment", appointmentSchema);
