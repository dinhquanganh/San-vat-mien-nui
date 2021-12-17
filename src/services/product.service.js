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
const queryProducts = async () => {
  const products = await Product.find({});

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

  Object.assign(product, {
    ...updateBody,
    // eslint-disable-next-line no-prototype-builtins
    show: updateBody.hasOwnProperty('show') ? updateBody.show : '',
    images: imagelist.length
      ? [...product.images, ...imagelist]
      : product.images,
  });
  await product.save();

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

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.remove();

  return product;
};

module.exports = {
  create,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
