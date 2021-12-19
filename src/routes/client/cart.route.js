const express = require('express');

const router = express.Router();

router.route('/').get((req, res) => {
  res.render('cart', {
    title: 'Giỏ hàng',
  });
});

module.exports = router;
