const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/admin/auth.controller');

const router = express.Router();

router
  .get('/', (req, res) => {
    res.render('login', {
      title: 'Đăng nhập',
    });
  })
  .post('/', validate(authValidation.login), authController.login);

module.exports = router;
