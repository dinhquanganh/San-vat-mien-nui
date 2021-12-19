const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const create = async (productBody) => {
  if (!productBody) {
    return { error: 'Product body is required' };
  }

  return Product.create(productBody);
};

/**
 * Query for products
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (filters = {}) => {
  const products = await Product.find(filters);

  return products;
};

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => Product.findById(id);

/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProductById = async (productId, updateBody, imagelist) => {
  const product = await getProductById(productId);
  if (!product) {
    return {
      error: 'Product not found',
      data: {},
    };
  }
  // let newBody = {};
  // if (imagelist.length) {
  //   newBody = {
  //     ...updateBody,
  //     // eslint-disable-next-line no-prototype-builtins
  //     show: updateBody.hasOwnProperty('show') ? updateBody.show : '',
  //   };
  // }

  Object.assign(product, {
    ...updateBody,
    // eslint-disable-next-line no-prototype-builtins
    show: updateBody.hasOwnProperty('show') ? updateBody.show : '',
    images: imagelist.length
      ? [...product.images, ...imagelist]
      : product.images,
  });
  await product.save();

  // const product = await Product.findByIdAndUpdate(
  //   productId,
  //   { ...newBody, $push: { images: imagelist } },
  //   { new: true }
  // ).exec();

  return {
    error: '',
    data: product,
  };
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  let error = '';

  if (!product) {
    error = 'product not found';
  }
  await product.remove();

  return { error, product };
};

module.exports = {
  create,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
