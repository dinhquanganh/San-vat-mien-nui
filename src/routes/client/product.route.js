const express = require('express');
const productController = require('../../controllers/client/product.controller');

const router = express.Router();

router.route('/:id').get(productController.getProduct);

module.exports = router;
