const mongoose = require("mongoose");

const cartModel = mongoose.Schema({
  userId: {
    required: true,
    type: String,
  },
  productId: {
    required: true,
    type: String,
  },
});
module.exports = mongoose.model("Cart", cartModel);
