const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('dashboard', {
    title: 'Trang chủ',
  });
});
module.exports = router;
