const express = require('express');
const dashboardRoute = require('./dashboard.route');
const loginRoute = require('./login.route');
const logoutRoute = require('./logout.route');
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
    path: '/logout',
    route: logoutRoute,
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
      res.render('404');
    },
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
