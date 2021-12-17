const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string(),
    show: Joi.string(),
    category: Joi.string().required(),
  }),
  files: Joi.object(),
};

const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  body: Joi.object().keys({
    name: Joi.string(),
    price: Joi.number(),
    description: Joi.string(),
    category: Joi.string(),
    show: Joi.string(),
  }),
  files: Joi.object(),
};

const deleteProduct = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  create,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
