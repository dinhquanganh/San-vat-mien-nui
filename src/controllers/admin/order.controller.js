const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const {
  emailService,
  orderService,
  productService
} = require('../../services');
const { mailContentNewOrder } = require('../../config/mailContent');
const { objectId } = require('../../validations/custom.validation');
// const email = 'sanvatmiennui22@gmail.com';
const email = 'cegopadocasi@mentonit.net';

const mapProductList = async () => {
  const productList = await productService.queryProducts(query);
  return order.productList.map((product, index) => ({
    ...productList[index]._doc,
    quantity: product.quantity
  }));
};

const calculateTotalAmount = (productList, shipPrice) => {
  return productList.reduce((p, c) => {
    return p + (c?.price || 0) * (c?.quantity || 0);
  }, shipPrice || 0);
};

const getOrders = catchAsync(async (req, res) => {
  let orderList = await orderService.queryOrders();

  await orderList.forEach(async (order) => {
    order.productList = await mapProductList();

    order.total = calculateTotalAmount(order.productList, order.shipPrice);
  });

  return res.render('order-list', {
    title: 'Danh sách đơn hàng',
    breadcrumb: [
      {
        url: '/admin/order',
        name: 'Đơn hàng'
      }
    ],
    orderList: orderList.sort((a, b) => {
      let dateA = new Date(a.createdAt);
      let dateB = new Date(b.createdAt);
      return dateB - dateA;
    })
  });
});

const getOrderItem = catchAsync(async (req, res) => {
  if (req?.params?.orderId) {
    let order = await orderService.getOrderById(req.params.orderId);

    const query = {
      _id: {
        $in: order.productList.map((product) => objectId(product.productId))
      }
    };
    const productList = await productService.queryProducts(query);
    order.productList = order.productList.map((product, index) => ({
      ...productList[index]._doc,
      quantity: product.quantity
    }));

    order.total = order.productList.reduce((p, c) => {
      return p + (c?.price || 0) * (c?.quantity || 0);
    }, order?.shipPrice || 0);

    return res.render('order', {
      title: 'Chỉnh sửa đơn hàng',
      breadcrumb: [
        {
          url: '/admin/order',
          name: 'Đơn hàng'
        },
        {
          url: '/admin/order/' + req.params.orderId.toString(),
          name: 'Chi tiết đơn hàng'
        }
      ],
      order
    });
  } else {
    res.redirect('/admin/order');
  }
});

const addOrders = catchAsync(async (req, res) => {
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

const deleteOrder = catchAsync(async (req, res) => {
  if (req.params?.orderId) {
    let { error } = await orderService.deleteOrderById(req.params.orderId);

    if (error)
      return res.status(httpStatus.NOT_FOUND).send({
        error
      });

    return res.send({
      status: 'Deleted successfully'
    });
  }

  return res.status(httpStatus.NOT_FOUND).send({
    error: 'Not found'
  });
});

module.exports = {
  getOrders,
  getOrderItem,
  addOrders,
  deleteOrder
};
