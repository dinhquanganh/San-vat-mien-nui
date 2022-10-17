const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const {
  emailService,
  orderService,
  productService
} = require('../../services');
const { mailContentNewOrder } = require('../../config/mailContent');
const { objectId } = require('../../validations/custom.validation');
const email = 'sanvatmiennui22@gmail.com';
// const email = 'cegopadocasi@mentonit.net';

const mapProductList = async (order, query = {}) => {
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

  orderList = orderList.sort((a, b) => {
    let dateA = new Date(`${a.createdAt}`).getTime();
    let dateB = new Date(`${b.createdAt}`).getTime();
    return dateB - dateA;
  });

  console.log({
    pending: orderList.filter((order) => order.status == 'pending').length,
    sent: orderList.filter((order) => order.status == 'sent').length,
    received: orderList.filter((order) => order.status == 'received').length
  });

  return res.render('order-list', {
    title: 'Danh sách đơn hàng',
    breadcrumb: [
      {
        url: '/admin/order',
        name: 'Đơn hàng'
      }
    ],
    orderList,
    overviewTab: {
      pending: orderList.filter((order) => order.status == 'pending').length,
      sent: orderList.filter((order) => order.status == 'sent').length,
      received: orderList.filter((order) => order.status == 'received').length
    }
  });
});

const getOrderItem = catchAsync(async (req, res) => {
  if (req?.params?.orderId) {
    let order = await orderService.getOrderById(req.params.orderId);

    if (!order.ers1) {
      const query = {
        _id: {
          $in: order.productList.map((product) => objectId(product.productId))
        }
      };

      order.productList = await mapProductList(order, query);
      order.total = calculateTotalAmount(order.productList, order.shipPrice);
      order.ers1 = true;
      order = (await orderService.updateOrderById(order._id, order)).data;
    }

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

  const query = {
    _id: {
      $in: order.productList.map((product) => objectId(product.productId))
    }
  };

  order.productList = await mapProductList(order, query);
  order.total = calculateTotalAmount(order.productList, order.shipPrice);
  order = await orderService.updateOrderById(order._id, order);

  await emailService.sendEmail(
    email,
    'Có đơn đặt hàng mới đang chờ bạn xử lý!',
    '',
    mailContentNewOrder(req.body.name)
  );

  return res.status(httpStatus.OK).json('Create successfully');
});

const updateOrder = catchAsync(async (req, res) => {
  if (req.params?.orderId) {
    let { data: order, error } = await orderService.updateOrderById(
      req.params.orderId,
      {
        status: req.body.status,
        note: req.body.note
      }
    );

    if (error)
      return res.status(httpStatus[500]).send({
        error
      });

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
      notification: 'Cập nhật thành công!',
      order
    });
  }

  return res.status(httpStatus.NOT_FOUND).send({
    error: 'Not found'
  });
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
  updateOrder,
  deleteOrder
};
