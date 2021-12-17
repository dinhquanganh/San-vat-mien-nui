const express = require('express');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/admin/product.controller');
const auth = require('../../middlewares/admin/auth');

const router = express.Router();

router.route('/').get(auth('manageProduct'), productController.getProducts);

router
  .route('/create')
  .get((req, res) => {
    res.render('create-product', {
      title: 'Tạo mới sản phẩm',
    });
  })
  .post(
    auth('manageProduct'),
    validate(productValidation.create),
    productController.create
  );

router
  .route('/:productId')
  .get(auth('manageProduct'), productController.getProduct)
  .post(
    auth('manageProduct'),
    validate(productValidation.updateProduct),
    productController.update
  );

router.route('/api/:productId').get(productController.getProductAPI);

module.exports = router;
