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
      default: 0,
    },
    unit: {
      type: String,
      default: '100g',
    },
    description: {
      type: String,
      required: false,
      trim: true,
      default: '',
      maxlength: 2000,
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
