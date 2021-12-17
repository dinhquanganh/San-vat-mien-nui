const catchAsync = require('../../utils/catchAsync');
const { orderService } = require('../../services');

const getOrderList = catchAsync(async (req, res) => {
  const orderList = await orderService.queryOrders();

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

const update = catchAsync(async (req, res) => {
  // if (req.params?.orderId) {
  //   const order = await orderService.updateOrderById(
  //     req.params.orderId,
  //     req.body
  //   );
  //   if (!order?.error)
  //     res.render('update-order', {
  //       title: 'Chỉnh sửa sản phẩm',
  //       order: order.data,
  //       categoryList: [
  //         {
  //           name: 'Trà',
  //           value: 'tea',
  //         },
  //         {
  //           name: 'Đồ ăn / Gia vị',
  //           value: 'food-spice',
  //         },
  //         {
  //           name: 'Hạt / Hoa quả sấy',
  //           value: 'seed-fruit',
  //         },
  //         {
  //           name: 'Mật ong / Dược liệu',
  //           value: 'honey-medicine',
  //         },
  //       ],
  //     });
  //   else res.redirect('back');
  // } else {
  //   res.redirect('back');
  // }
});

module.exports = {
  getOrderList,
  getOrderItem,
};
