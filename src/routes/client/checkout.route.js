const express = require('express');
const checkoutController = require('../../controllers/client/checkout.controller');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.render('checkout', {
      title: 'Đặt hàng',
      page: 'checkout'
    });
  })
  .post(checkoutController.order);

module.exports = router;
