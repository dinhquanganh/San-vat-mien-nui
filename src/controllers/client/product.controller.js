const catchAsync = require('../../utils/catchAsync');
const { productService } = require('../../services');
const { convertDeltaToHtml } = require('node-quill-converter');

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, match, replacement) {
  return str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement);
}

const getProduct = catchAsync(async (req, res) => {
  if (req.params?.id) {
    let { name, description, _id, images, price, category, unit } =
      await productService.getProductById(req.params.id);

    const product = {
      name,
      description: description
        ? convertDeltaToHtml(
            JSON.parse(replaceAll(description, '//endofline**n', `\\n`))
          )
        : 'Chưa có mô tả cho sản phẩm này',
      _id,
      images,
      price,
      category,
      unit
    };

    return res.render('product-detail', {
      title: product.name,
      page: 'product',
      product,
      id: req.params.id.toString()
    });
  }

  return res.redirect('/');
});

const searchProducts = catchAsync(async (req, res) => {
  let ids = req.query.id;
  let productList = await productService.queryProducts({
    _id: ids
  });

  res.json(productList);
});

module.exports = {
  getProduct,
  searchProducts
};
