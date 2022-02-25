const catchAsync = require('../../utils/catchAsync');
const { productService } = require('../../services');

const getDataHome = catchAsync(async (req, res) => {
  // res.setHeader(
  //   'Content-Security-Policy',
  //   "default-src *; script-src * 'unsafe-inline'; img-src * data:; style-src * 'unsafe-inline'; connect-src *; font-src *; object-src *; media-src *; frame-src *; frame-ancestors *; base-uri *; form-action *; block-all-mixed-content; upgrade-insecure-requests;"
  // );

  const tea = await productService.queryProducts({
    show: 'on',
    category: 'tea',
  });

  const foodSpice = await productService.queryProducts({
    show: 'on',
    category: 'food-spice',
  });

  const seedFruit = await productService.queryProducts({
    show: 'on',
    category: 'seed-fruit',
  });

  const honeyMedicine = await productService.queryProducts({
    show: 'on',
    category: 'honey-medicine',
  });

  const newProduct = await productService.queryProducts({
    show: 'on',
    newProduct: 'on',
  });

  const mapProduct = (product) => ({
    id: product._id,
    name: product.name,
    price: product.price,
    images: product.images,
    category: product.category,
  });

  tea.map(mapProduct);
  foodSpice.map(mapProduct);
  seedFruit.map(mapProduct);
  honeyMedicine.map(mapProduct);
  newProduct.map(mapProduct);

  res.render('home', {
    title: 'Trang chủ',
    tea,
    foodSpice,
    seedFruit,
    honeyMedicine,
    newProduct,
  });
});

module.exports = {
  getDataHome,
};
