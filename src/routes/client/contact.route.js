const express = require('express');

const router = express.Router();

router.route('/').get((req, res) => {
  res.render('contact', {
    title: 'Liên hệ',
    page: 'contact',
  });
});
module.exports = router;
