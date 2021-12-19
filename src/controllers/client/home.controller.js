const catchAsync = require('../../utils/catchAsync');
const { productService } = require('../../services');

const getDataHome = catchAsync(async (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src *; script-src * 'unsafe-inline'; img-src * data:; style-src * 'unsafe-inline'; connect-src *; font-src *; object-src *; media-src *; frame-src *; frame-ancestors *; base-uri *; form-action *; block-all-mixed-content; upgrade-insecure-requests;"
  );

  const tea = await productService.queryProducts({
    show: 'on',
    category: 'tea',
  });

  tea.map((product) => ({
    id: product._id,
    name: product.name,
    price: product.price,
    images: product.images,
    category: product.category,
  }));

  res.render('home', {
    title: 'Danh sách sản phẩm',
    tea,
  });
});

const getProduct = catchAsync(async (req, res) => {
  if (req?.params?.productId) {
    const product = await productService.getProductById(req.params.productId);

    res.setHeader(
      'Content-Security-Policy',
      "default-src *; script-src * 'unsafe-inline'; img-src * data:; style-src * 'unsafe-inline'; connect-src *; font-src *; object-src *; media-src *; frame-src *; frame-ancestors *; base-uri *; form-action *; block-all-mixed-content; upgrade-insecure-requests;"
    );

    res.render('product', {
      title: 'Chỉnh sửa sản phẩm',
      product,
      id: product._id.toString(),
      categoryList: [
        {
          name: 'Trà',
          value: 'tea',
        },
        {
          name: 'Đồ ăn / Gia vị',
          value: 'food-spice',
        },
        {
          name: 'Hạt / Hoa quả sấy',
          value: 'seed-fruit',
        },
        {
          name: 'Mật ong / Dược liệu',
          value: 'honey-medicine',
        },
      ],
    });
  } else {
    res.redirect('/admin/product');
  }
});

module.exports = {
  getDataHome,
};
