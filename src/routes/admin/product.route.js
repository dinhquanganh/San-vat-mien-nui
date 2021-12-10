const express = require("express");
const validate = require("../../middlewares/validate");
const productValidation = require("../../validations/product.validation");
const productController = require("../../controllers/admin/product.controller");

const router = express.Router();

router.route("/").get((req, res) => {
  res.render("product", {
    title: "Danh sách Sản phẩm",
  });
});

router
  .route("/create")
  .get((req, res) => {
    res.render("create-product", {
      title: "Tạo mới sản phẩm",
    });
  })
  .post(validate(productValidation.create), productController.create);

module.exports = router;
