const { Order } = require('../models');

/**
 * Create a order
 * @param {Object} orderBody
 * @returns {Promise<Order>}
 */
const create = async (orderBody) => {
  if (!orderBody) {
    return { error: 'Order body is required' };
  }

  return Order.create(orderBody);
};

/**
 * Query for orders
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (filters = {}) => {
  const orders = await Order.find(filters);

  return orders;
};

/**
 * Get order by id
 * @param {ObjectId} id
 * @returns {Promise<Order>}
 */
const getOrderById = async (id) => Order.findById(id);

/**
 * Update order by id
 * @param {ObjectId} orderId
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateOrderById = async (orderId, updateBody) => {
  const order = await getOrderById(orderId);

  if (!order) {
    return {
      error: 'Order not found',
      data: {}
    };
  }

  Object.assign(order, updateBody);
  // await order.save();
  await Order.findByIdAndUpdate(orderId, order);

  return {
    error: '',
    data: order
  };
};

// /**
//  * Delete order by id
//  * @param {ObjectId} orderId
//  * @returns {Promise<Order>}
//  */
const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  let error = '';

  if (!order) {
    error = 'product not found';
  }
  await order.remove();

  return { order, error };
};

module.exports = {
  create,
  queryOrders,
  updateOrderById,
  getOrderById,
  deleteOrderById
};
