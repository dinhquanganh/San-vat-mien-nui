const express = require('express');

const router = express.Router();

router.route('/').get((req, res) => {
  res.render('about', {
    title: 'Về chúng tôi',
    page: 'about',
  });
});

module.exports = router;
