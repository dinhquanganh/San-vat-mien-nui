const express = require('express');
const validate = require('../../middlewares/admin/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/admin/product.controller');
const auth = require('../../middlewares/admin/auth');

const router = express.Router();

router.route('/').get(auth('manageProduct'), productController.getProducts);

router
  .route('/create')
  .get(auth('manageProduct'), (req, res) => {
    res.setHeader(
      'Content-Security-Policy',
      "default-src *; script-src * 'unsafe-inline'; img-src * data:; style-src * 'unsafe-inline'; connect-src *; font-src *; object-src *; media-src *; frame-src *; frame-ancestors *; base-uri *; form-action *; block-all-mixed-content; upgrade-insecure-requests;"
    );
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
  )
  .delete(auth('manageProduct'), productController.deleteProduct);

router.route('/api/:productId').get(productController.getProductAPI);

module.exports = router;
