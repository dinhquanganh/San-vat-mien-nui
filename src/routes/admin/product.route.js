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
    res.render('create-product', {
      title: 'Tạo mới sản phẩm',
      categoryList: [
        {
          name: 'Trà',
          value: 'tea',
        },
        {
          name: 'Đồ ăn / Gia vị',
          value: 'food-spice',
        },
        {
          name: 'Hạt / Hoa quả sấy',
          value: 'seed-fruit',
        },
        {
          name: 'Mật ong / Dược liệu',
          value: 'honey-medicine',
        },
      ],
      unitList: [
        {
          name: '1kg',
          value: 'kg',
        },
        {
          name: '100g',
          value: '100g',
        },
        {
          name: '1 lít',
          value: '1liter',
        },
      ],
    });
  })
  .post(
    auth('manageProduct'),
    validate(productValidation.create),
    productController.create
  );

router
  .route('/api/removeImage/:productId')
  .post(productController.deleteLinkImage);

router.route('/api/:productId').get(productController.getProductAPI);

router
  .route('/:productId')
  .get(auth('manageProduct'), productController.getProduct)
  .post(
    auth('manageProduct'),
    validate(productValidation.updateProduct),
    productController.update
  )
  .delete(auth('manageProduct'), productController.deleteProduct);

module.exports = router;
