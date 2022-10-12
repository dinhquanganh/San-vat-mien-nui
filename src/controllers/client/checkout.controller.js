const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const {
  productService,
  orderService,
  emailService
} = require('../../services');
const { mailContentNewOrder } = require('../../config/mailContent');

const order = catchAsync(async (req, res) => {
  const orderList = req.body.productList || [];

  if (!Array.isArray(orderList) || !orderList.length) {
    return res.json({
      message: 'null'
    });
  }

  const newOrder = await orderService.create({
    ...req.body.user,
    productList: []
  });
  let productListNewOrder = [];

  orderList.forEach(async (orderItem) => {
    const product = await productService.getProductById(orderItem.productId);

    if (product.error !== 'Product not found') {
      productListNewOrder = [...productListNewOrder, orderItem];
      await orderService.updateOrderById(newOrder._id, {
        productList: productListNewOrder
      });
    }
  });

  if (newOrder.email) {
    await emailService.sendEmail(
      newOrder.email,
      'Có đơn đặt hàng mới đang chờ bạn xử lý!',
      '',
      mailContentNewOrder(newOrder.name)
    );
  }

  return res.status(httpStatus.OK).json({
    message: 'success'
  });
});

module.exports = {
  order
};
