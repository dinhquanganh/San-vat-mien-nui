const express = require('express');

const router = express.Router();

router.route('/').get((req, res) => {
  res.render('checkout', {
    title: 'Đặt hàng',
    page: 'checkout',
  });
});

module.exports = router;
