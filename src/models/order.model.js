const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 30
    },
    price: {
      type: Number,
      trim: true,
      default: 0
    },
    email: {
      type: String,
      trim: true,
      default: ''
    },
    deliveryAddress: {
      type: String,
      trim: true,
      required: true
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: true
    },
    productList: {
      type: Array,
      default: []
    },
    status: {
      type: String,
      trim: true,
      default: 'pending'
    },
    note: {
      type: String,
      default: ''
    },
    shipPrice: {
      type: Number,
      trim: true,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    ers1: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
