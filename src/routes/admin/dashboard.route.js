const express = require("express");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("dashboard", {
    title: "Trang chủ",
  });
});

module.exports = router;
