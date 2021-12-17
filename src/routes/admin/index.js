const express = require('express');
const dashboardRoute = require('./dashboard.route');
const loginRoute = require('./login.route');
const productRoute = require('./product.route');
const orderRoute = require('./order.route');
const uploadRoute = require('./upload.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: dashboardRoute,
  },
  {
    path: '/login',
    route: loginRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/order-list',
    route: orderRoute,
  },
  {
    path: '/upload',
    route: uploadRoute,
  },
  {
    path: '*',
    route: (req, res) => {
      res.setHeader(
        'Content-Security-Policy',
        "default-src *; script-src *; img-src *; style-src * 'unsafe-inline'; connect-src *; font-src *; object-src *; media-src *; frame-src *; frame-ancestors *; base-uri *; form-action *; block-all-mixed-content; upgrade-insecure-requests;"
      );
      res.render('404');
    },
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
