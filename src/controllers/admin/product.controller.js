const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { productService, emailService } = require('../../services');
const cloudinary = require('../../config/cloudinary');
const fs = require('fs');

const uploadImageToCloudinary = async (listFile) => {
  try {
    const multiplePicturePromise = listFile.map((picture) =>
      cloudinary.uploader.upload(picture.tempFilePath, {
        file: picture.tempFilePath,
        upload_preset: 'svmn_preset'
      })
    );

    let imageResponses = await Promise.all(multiplePicturePromise);

    listFile.forEach((picture, index) => {
      fs.unlinkSync(picture.tempFilePath);
    });

    imageResponses = imageResponses.map((image) => ({
      id: image.public_id,
      url: image.secure_url,
      type: image.format,
      size: image.bytes
    }));

    return imageResponses;
  } catch (error) {
    console.log(error);
  }
};

const getProducts = catchAsync(async (req, res) => {
  // res.setHeader(
  //   'Content-Security-Policy',
  //   "default-src *; script-src * 'unsafe-inline'; img-src * data:; style-src * 'unsafe-inline'; connect-src *; font-src *; object-src *; media-src *; frame-src *; frame-ancestors *; base-uri *; form-action *; block-all-mixed-content; upgrade-insecure-requests;"
  // );

  const products = await productService.queryProducts(req.query);
  let totalShowProduct = 0;

  products.forEach((product) => {
    if (product.show == 'on') {
      totalShowProduct++;
    }
  });

  let titleName = 'Danh sách sản phẩm';
  if (req.query.category == 'tea') {
    titleName = 'Trà';
  } else if (req.query.category == 'food-spice') {
    titleName = 'Đồ ăn / gia vị';
  } else if (req.query.category == 'seed-and-fruit') {
    titleName = 'Hạt / hoa quả sấy';
  } else if (req.query.category == 'honey-medicine') {
    titleName = 'Mật ong / dược liệu';
  }

  res.render('product-list', {
    title: titleName,
    products,
    totalShowProduct,
    breadcrumb: [
      {
        url: '/admin/product',
        name: 'Sản phẩm'
      }
    ]
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

    // res.setHeader(
    //   'Content-Security-Policy',
    //   "default-src *; script-src * 'unsafe-inline'; img-src * data:; style-src * 'unsafe-inline'; connect-src *; font-src *; object-src *; media-src *; frame-src *; frame-ancestors *; base-uri *; form-action *; block-all-mixed-content; upgrade-insecure-requests;"
    // );

    res.render('product', {
      title: 'Chỉnh sửa sản phẩm',
      product,
      id: product._id.toString(),
      categoryList: [
        {
          name: 'Trà',
          value: 'tea'
        },
        {
          name: 'Đồ ăn / Gia vị',
          value: 'food-spice'
        },
        {
          name: 'Hạt / Hoa quả sấy',
          value: 'seed-fruit'
        },
        {
          name: 'Mật ong / Dược liệu',
          value: 'honey-medicine'
        }
      ],
      unitList: [
        {
          name: '1kg',
          value: 'kg'
        },
        {
          name: '100g',
          value: '100g'
        },
        {
          name: '1 lít',
          value: '1liter'
        }
      ],
      breadcrumb: [
        {
          url: '/admin/product',
          name: 'Sản phẩm'
        },
        {
          url: '/admin/product/' + product._id.toString(),
          name: 'Chi tiết sản phẩm'
        }
      ]
    });
  } else {
    res.redirect('/admin/product');
  }
});

const create = catchAsync(async (req, res) => {
  const product = await productService.create(req.body);

  if (product) {
    res.redirect('/admin/product/' + product._id.toString());
  } else {
    res.render('/admin/product/create', {
      title: 'Tạo mới sản phẩm',
      notification: '',
      breadcrumb: [
        {
          url: '/admin/product',
          name: 'Sản phẩm'
        },
        {
          url: '/admin/product/create',
          name: 'Tạo sản phẩm'
        }
      ]
    });
  }
});

const update = catchAsync(async (req, res) => {
  if (req.params?.productId) {
    let dataBody = req.body;
    let imageList = [];
    let product;

    if (req.files) {
      const listFile = Object.values(req.files);
      imageList = await uploadImageToCloudinary(listFile);

      product = await productService.getProductById(req.params.productId);
      dataBody.images = product.images
        ? [...product.images, ...imageList]
        : imageList;
      dataBody = { ...product, ...dataBody };
    } else {
      dataBody = {
        ...dataBody,
        show: dataBody.show ? dataBody.show : '',
        bestSeller: dataBody.bestSeller ? dataBody.bestSeller : '',
        featuredProduct: dataBody.featuredProduct
          ? dataBody.featuredProduct
          : '',
        newProduct: dataBody.newProduct ? dataBody.newProduct : ''
      };
    }

    const result = await productService.updateProductById(
      req.params.productId,
      dataBody
    );

    if (result.error) {
      return res.status(httpStatus.NOT_FOUND).send({
        error
      });
    }

    res.redirect('/admin/product/' + req.params.productId);
    // return res.redirect(req.originalUrl);
  }
});

const deleteProduct = catchAsync(async (req, res) => {
  if (req.params?.productId) {
    let { error } = await productService.deleteProductById(
      req.params.productId
    );

    if (error)
      return res.status(httpStatus.NOT_FOUND).send({
        error
      });

    return res.send({
      status: 'Deleted successfully'
    });
  }

  return res.status(httpStatus.NOT_FOUND).send({
    error: 'Not found'
  });
});

const findIdImageAndRemove = catchAsync(async (req, res) => {
  if (req.params?.productId) {
    const product = await productService.getProductById(req.params.productId);
    let imagesListProduct = product.images;
    let check = false;

    for (let item of imagesListProduct) {
      if (item.id == req.body.idImage) {
        imagesListProduct.splice(imagesListProduct.indexOf(item), 1);
        check = true;
        break;
      }
    }

    if (!check) return res.status(httpStatus.NOT_FOUND).json('Not found image');

    const productUpdate = {
      ...product,
      images: imagesListProduct
    };

    const result = await productService.updateProductById(
      req.params.productId,
      productUpdate
    );

    if (result.error) {
      return res.status(httpStatus.NOT_FOUND).send({
        error
      });
    }
    return res.status(httpStatus.OK).json('Deleted successfully');
  }
});

module.exports = {
  getProducts,
  getProduct,
  create,
  update,
  getProductAPI,
  deleteProduct,
  findIdImageAndRemove
};
