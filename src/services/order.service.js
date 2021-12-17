const { Order } = require('../models');

// /**
//  * Create a order
//  * @param {Object} orderBody
//  * @returns {Promise<Order>}
//  */
// const create = async (orderBody) => {
//   if (!orderBody) {
//     return { error: 'Order body is required' };
//   }

//   return Order.create(orderBody);
// };

/**
 * Query for orders
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async () => {
  const orders = await Order.find();

  return orders;
};

// /**
//  * Get order by id
//  * @param {ObjectId} id
//  * @returns {Promise<Order>}
//  */
// const getOrderById = async (id) => Order.findById(id);

// /**
//  * Update order by id
//  * @param {ObjectId} orderId
//  * @param {Object} updateBody
//  * @returns {Promise<Order>}
//  */
// const updateOrderById = async (orderId, updateBody) => {
//   const order = await getOrderById(orderId);

//   if (!order) {
//     return {
//       error: 'Order not found',
//       data: {},
//     };
//   }

//   Object.assign(order, {
//     ...updateBody,
//     // eslint-disable-next-line no-prototype-builtins
//     show: updateBody.hasOwnProperty('show') ? updateBody.show : '',
//   });
//   await order.save();

//   return {
//     error: '',
//     data: order,
//   };
// };

// /**
//  * Delete order by id
//  * @param {ObjectId} orderId
//  * @returns {Promise<Order>}
//  */
// const deleteOrderById = async (orderId) => {
//   const order = await getOrderById(orderId);

//   if (!order) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
//   }
//   await order.remove();

//   return order;
// };

module.exports = { queryOrders };
