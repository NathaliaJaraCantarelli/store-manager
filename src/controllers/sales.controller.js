const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const insertSaleProduct = async (req, res) => {
    const sales = req.body;
    const { type, message } = await salesService.insertSaleProduct(sales);
    if (type) return res.status(errorMap.mapError(type)).json(message);
    res.status(201).json(message);
};

module.exports = {
    insertSaleProduct,
};
