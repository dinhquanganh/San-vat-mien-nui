const express = require('express');
const auth = require('../../middlewares/admin/auth');
const orderController = require('../../controllers/admin/order.controller');

const router = express.Router();

router.route('/').get(auth('getOrder'), orderController.getOrderList);

module.exports = router;
