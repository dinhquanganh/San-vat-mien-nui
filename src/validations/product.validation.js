const Joi = require("joi");
const { objectId } = require("./custom.validation");

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string(),
    category: Joi.string().required(),
    show: Joi.required(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      price: Joi.number(),
      show: Joi.boolean(),
    })
    .min(1),
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
