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

    let product = {
      name,
      description: convertDeltaToHtml(
        JSON.parse(replaceAll(description, '//endofline**n', `\\n`))
      ),
      _id,
      images,
      price,
      category,
      unit,
    };

    console.log(product);

    res.render('product-detail', {
      title: product.name,
      page: 'product',
      product,
      id: req.params.id.toString(),
    });
  }
  return res.redirect('/');
});

const searchProducts = catchAsync(async (req, res) => {
  let ids = req.query.id;
  console.log(ids);
  let productList = await productService.queryProducts({
    _id: ids,
  });

  res.json(productList);
});

module.exports = {
  getProduct,
  searchProducts,
};
