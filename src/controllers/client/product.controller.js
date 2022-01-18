const catchAsync = require('../../utils/catchAsync');
const { productService } = require('../../services');
const { convertDeltaToHtml } = require('node-quill-converter');
var QuillDeltaToHtmlConverter =
  require('quill-delta-to-html').QuillDeltaToHtmlConverter;

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, match, replacement) {
  return str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement);
}

const getProduct = catchAsync(async (req, res) => {
  await res.setHeader(
    'Content-Security-Policy',
    "default-src *; script-src * 'unsafe-inline'; img-src * data:; style-src * 'unsafe-inline'; connect-src *; font-src *; object-src *; media-src *; frame-src *; frame-ancestors *; base-uri *; form-action *; block-all-mixed-content; upgrade-insecure-requests;"
  );

  if (req.params?.id) {
    let { name, description, _id, images, price, category } =
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
    };

    console.log(product);

    res.render('product-detail', {
      title: product.name,
      page: 'product',
      product,
      id: req.params.productId,
    });
  }
  return res.redirect('/');
});

module.exports = {
  getProduct,
};
