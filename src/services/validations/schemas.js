const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const nameProduct = Joi.object({
    name: Joi.string().min(5).required(),
});

const salesProduct = Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
});

module.exports = {
    idSchema,
    nameProduct,
    salesProduct,
};
