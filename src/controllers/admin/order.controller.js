const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { orderService } = require('../../services');

const getOrderList = catchAsync(async (req, res) => {
  const orderList = await orderService.queryOrders();
  console.log(orderList);

  res.render('order-list', {
    title: 'Danh sách đơn hàng',
    orderList,
  });
});

const getOrderItem = catchAsync(async (req, res) => {
  if (req?.params?.orderId) {
    const order = await orderService.getOrderById(req.params.orderId);

    res.render('order-item', {
      title: 'Chỉnh sửa đơn hàng',
      order,
    });
  } else {
    res.redirect('/admin/order');
  }
});

const addOrders = catchAsync(async (req, res) => {
  let order = await orderService.create(req.body);

  if (order.error) return res.status(httpStatus[400]).json('Error');

  return res.status(httpStatus.OK).json('Success');
});

module.exports = {
  getOrderList,
  getOrderItem,
  addOrders,
};
