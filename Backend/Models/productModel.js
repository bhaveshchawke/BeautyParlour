const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxLength: [100, "Product name cannot exceed 100 characters"],
    },
    brand: {
      type: String,
      required: [true, "Brand name is required"],
      trim: true,
    },
    productCategory: {
      type: String,
      required: [true, "Product category is required"],
      enum: ["Hair Care", "Skin Care", "Makeup", "Tools & Appliances", "Other"],
      default: "Hair Care",
    },
    badge: {
      type: String,
      enum: ["NEW", "HOT", "BEST SELLER", "SALE", "None"],
      default: "None",
    },
    originalPrice: {
      type: Number,
      required: [true, "Original price is required"],
      min: [0, "Price cannot be less than 0"],
    },
    salePrice: {
      type: Number,
      required: [true, "Sale price is required"],
      min: [0, "Sale price cannot be less than 0"],
    },
    stockQuantity: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    productDescription: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      maxLength: [1000, "Description cannot exceed 1000 characters"],
    },
    productImage: {
      type: String,
      required: [true, "Product image is required"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
