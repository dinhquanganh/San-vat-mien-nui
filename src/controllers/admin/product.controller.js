const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const { productService } = require("../../services");

const create = catchAsync(async (req, res) => {
  // res.status(httpStatus.CREATED).send({ user, tokens });
  const product = await productService.create(req.body);
  console.log(product);
  if (product) {
    res.status(httpStatus.CREATED).redirect("/admin/product/create");
  }
});

module.exports = {
  create,
};
