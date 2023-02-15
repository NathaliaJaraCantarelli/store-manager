const { idSchema } = require('./schemas');

const validateId = (id) => {
    const { error } = idSchema.validate(id);
    if (error) return { type: 'INVALID_VALUE', message: 'ID invalid' };

    return { type: '', message: '' };
};

module.exports = {
    validateId,
};
