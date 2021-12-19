const express = require('express');
const homeRoute = require('./home.route');
const aboutRoute = require('./about.route');
const cartRoute = require('./cart.route');
const checkoutRoute = require('./checkout.route');
const contactRoute = require('./contact.route');
const productRoute = require('./product.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: homeRoute,
  },
  {
    path: '/about-us',
    route: aboutRoute,
  },
  {
    path: '/cart',
    route: cartRoute,
  },
  {
    path: '/checkout',
    route: checkoutRoute,
  },
  {
    path: '/contact',
    route: contactRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
