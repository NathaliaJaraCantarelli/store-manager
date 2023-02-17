const { idSchema, nameProduct, salesProduct } = require('./schemas');

const validateId = (id) => {
    const { error } = idSchema.validate(id);
    if (error) return { type: 'INVALID_VALUE', message: 'ID invalid' };

    return { type: '', message: '' };
};

const validateNameProduct = (name) => {
    const { error } = nameProduct.validate({ name });
    if (error) return { type: 'INVALID_VALUE', message: error.message };

    return { type: '', message: '' };
};

const validateSalesProduct = ({ productId, quantity }) => {
    const { error } = salesProduct.validate({ productId, quantity });
    if (error) {
        if (!error.message.includes('greater')) {
            return { type: 'INVALID_INPUT', message: error.message };
        }
        return { type: 'INVALID_VALUE', message: error.message };
    }

    return { type: '', message: '' };
};

module.exports = {
    validateId,
    validateNameProduct,
    validateSalesProduct,
};
