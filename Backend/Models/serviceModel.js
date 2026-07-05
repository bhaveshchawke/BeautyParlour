const mongoose = require("mongoose");

const serviceModel = new mongoose.Schema(
  {
    serviceTitle: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      maxLength: [100, "Service title cannot exceed 100 characters"],
    },
    servicePrice: {
      type: Number,
      required: [true, "Service price is required"],
      min: [0, "Price cannot be less than 0"],
    },
    serviceDuration: {
      type: Number,
      required: [true, "Service duration (in minutes) is required"],
      min: [1, "Duration must be at least 1 minute"],
    },
    serviceDescription: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
      maxLength: [500, "Description cannot exceed 500 characters"],
    },
    // Category (Hair, Face, Body, Bridal) - Optional in form but good for DB
    category: {
      type: String,
      enum: ["Face", "Hair", "Body", "Bridal", "Other"],
      default: "Other",
    },
    // Image URL for the service photo
    image: {
      type: String,
      default: "https://via.placeholder.com/150", // Default placeholder if no image uploaded
    },
    // To handle the Active/Off Toggle Switch functionality
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
  },
);

const Service = mongoose.model("Service", serviceModel);

module.exports = Service;
