const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 30,
    },
    price: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      default: "",
      minlength: 0,
      maxlength: 200,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    typeProductId: {
      type: mongoose.ObjectId,
    },
    show: {
      type: String,
      default: "on",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Product
 */
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
