const { idSchema, nameProduct } = require('./schemas');

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

module.exports = {
    validateId,
    validateNameProduct,
};
