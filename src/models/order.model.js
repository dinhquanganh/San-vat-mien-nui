const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 30,
    },
    date: {
      type: Date,
    },
    price: {
      type: Number,
      trim: true,
      default: 0,
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: true,
    },
    productList: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
