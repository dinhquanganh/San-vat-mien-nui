const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    salePrice: Joi.number(),
    unit: Joi.string(),
    description: Joi.string().allow(''),
    sale: Joi.string(),
    show: Joi.string(),
    category: Joi.string().required(),
    bestSeller: Joi.string(),
    featuredProduct: Joi.string(),
    newProduct: Joi.string()
  }),
  files: Joi.object()
};

const getProducts = {
  query: Joi.object().keys({
    category: Joi.string()
  })
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId)
  })
};

const updateProduct = {
  body: Joi.object().keys({
    name: Joi.string(),
    price: Joi.number(),
    salePrice: Joi.number(),
    sale: Joi.string(),
    unit: Joi.string(),
    description: Joi.string().allow(''),
    category: Joi.string(),
    show: Joi.string(),
    bestSeller: Joi.string(),
    featuredProduct: Joi.string(),
    newProduct: Joi.string()
  }),
  files: Joi.object()
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId)
  })
};

module.exports = {
  create,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
};
