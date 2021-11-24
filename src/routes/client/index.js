const express = require('express');
const homeRoute = require('./home.route');
const contactRoute = require('./contact.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: homeRoute,
  },
  {
    path: '/contact',
    route: contactRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
