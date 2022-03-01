const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email(),
    deliveryAddress: Joi.string().required(),
    productList: Joi.array().required(),
    note: Joi.string().max(1000),
  }),
};

const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  create,
  getOrder,
  deleteOrder,
};
