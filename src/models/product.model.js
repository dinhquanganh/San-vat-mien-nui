const mongoose = require('mongoose');

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
      unique: true,
      default: 0,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      default: '',
      maxlength: 200,
    },
    category: {
      type: String,
      required: true,
      default: 'tea',
      trim: true,
    },
    show: {
      type: String,
      default: '',
    },
    images: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
