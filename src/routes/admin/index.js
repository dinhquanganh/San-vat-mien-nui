const express = require("express");
const dashboardRoute = require("./dashboard.route");
const loginRoute = require("./login.route");
const productRoute = require("./product.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/",
    route: dashboardRoute,
  },
  {
    path: "/login",
    route: loginRoute,
  },
  {
    path: "/product",
    route: productRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

