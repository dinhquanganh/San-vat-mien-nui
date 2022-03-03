/* eslint-disable no-prototype-builtins */
const { Product } = require('../models');

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
const updateProductById = async (productId, updateBody) => {
  const product = await getProductById(productId);
  if (!product) {
    return {
      error: 'Product not found',
      data: {},
    };
  }

  Object.assign(product, updateBody);
  await product.save();

  return {
    error: '',
    data: product,
  };
};

const updateAllProduct = async () => {
  await Product.updateMany(
    {},
    {
      salePrice: 0,
      sale: '',
    }
  );
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
  updateAllProduct,
};
