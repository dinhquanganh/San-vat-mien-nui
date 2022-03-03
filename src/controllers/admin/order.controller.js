const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { emailService, orderService } = require('../../services');
const { mailContentNewOrder } = require('../../config/mailContent');
// const email = 'sanvatmiennui22@gmail.com';
const email = 'cegopadocasi@mentonit.net';

const getOrders = catchAsync(async (req, res) => {
  const orderList = await orderService.queryOrders();

  res.render('order-list', {
    title: 'Danh sách đơn hàng',
    breadcrumb: [
      {
        url: '/admin/order',
        name: 'Đơn hàng',
      },
    ],
    orderList,
  });
});

const getOrderItem = catchAsync(async (req, res) => {
  if (req?.params?.orderId) {
    const order = await orderService.getOrderById(req.params.orderId);

    res.render('order-item', {
      title: 'Chỉnh sửa đơn hàng',
      breadcrumb: [
        {
          url: '/admin/order',
          name: 'Đơn hàng',
        },
        {
          url: '/admin/order/' + req.params.orderId.toString(),
          name: 'Chi tiết đơn hàng',
        },
      ],
      order,
    });
  } else {
    res.redirect('/admin/order');
  }
});

const addOrders = catchAsync(async (req, res) => {
  console.log(req.body);
  let order = await orderService.create(req.body);

  if (order.error)
    return res.status(httpStatus[400]).json('Error: ' + order.error);

  await emailService.sendEmail(
    email,
    'Có đơn đặt hàng mới đang chờ bạn xử lý!',
    '',
    mailContentNewOrder(req.body.name)
  );

  return res.status(httpStatus.OK).json('Create successfully');
});

module.exports = {
  getOrders,
  getOrderItem,
  addOrders,
};
