const catchAsync = require('../../utils/catchAsync');
const { productService } = require('../../services');
const cloudinary = require('../../config/cloudinary');

const uploadImageToCloudinary = async (listFile) => {
  console.log(listFile);
  try {
    const multiplePicturePromise = listFile.map((picture) =>
      cloudinary.uploader.upload(picture.tempFilePath, {
        file: picture.tempFilePath,
        upload_preset: 'svmn_preset',
      })
    );

    let imageResponses = await Promise.all(multiplePicturePromise);

    imageResponses = imageResponses.map((image) => ({
      id: image.public_id,
      url: image.secure_url,
      type: image.format,
      size: image.bytes,
    }));

    return imageResponses;
  } catch (error) {
    console.log(error);
  }
};

const getProducts = catchAsync(async (req, res) => {
  const products = await productService.queryProducts();
  // console.log(products);
  let totalShowProduct = 0;
  products.forEach((product) => {
    if (product.show == 'on') {
      totalShowProduct++;
    }
  });

  res.render('product-list', {
    title: 'Danh sách sản phẩm',
    products,
    totalShowProduct,
  });
});
const getProductAPI = catchAsync(async (req, res) => {
  if (req?.params?.productId) {
    const product = await productService.getProductById(req.params.productId);
    res.status(200).json(product);
  }
});

const getProduct = catchAsync(async (req, res) => {
  if (req?.params?.productId) {
    const product = await productService.getProductById(req.params.productId);
    // console.log(Array(...product.images));
    // console.log(typeof product.images);

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

const create = catchAsync(async (req, res) => {
  const product = await productService.create(req.body);

  if (product) {
    res.redirect('/admin/product/create');
  } else {
    res.render('/admin/product/create', {
      title: 'Tạo mới sản phẩm',
      notification: 'Lỗi',
    });
  }
});

const update = catchAsync(async (req, res) => {
  if (req.params?.productId) {
    res.setHeader(
      'Content-Security-Policy',
      "default-src *; script-src * 'unsafe-inline'; img-src * data:; style-src * 'unsafe-inline'; connect-src *; font-src *; object-src *; media-src *; frame-src *; frame-ancestors *; base-uri *; form-action *; block-all-mixed-content; upgrade-insecure-requests;"
    );

    let imageList = [];
    if (req.files) {
      const listFile = Object.values(req.files);
      imageList = await uploadImageToCloudinary(listFile);
    }

    const product = await productService.updateProductById(
      req.params.productId,
      req.body,
      imageList
    );

    console.log(product.images);

    res.redirect(req.get('referer'));
  } else {
    res.redirect('/admin/product');
  }
});

module.exports = {
  getProducts,
  getProduct,
  create,
  update,
  getProductAPI,
};
