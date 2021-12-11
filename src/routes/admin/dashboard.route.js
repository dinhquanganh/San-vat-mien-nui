const express = require('express');
const auth = require('../../middlewares/admin/auth');

const router = express.Router();

router.get('/', auth('getDashboard'), (req, res) => {
  res.render('dashboard', {
    title: 'Trang chủ',
  });
});

module.exports = router;
