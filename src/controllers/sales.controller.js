const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const insertSaleProduct = async (req, res) => {
    const sales = req.body;
    const { type, message } = await salesService.insertSaleProduct(sales);
    if (type) return res.status(errorMap.mapError(type)).json(message);
    res.status(201).json(message);
};

const returnAllSales = async (_req, res) => {
    const { message } = await salesService.findAllSales();
    res.status(200).json(message);
};

const returnSaleById = async (req, res) => {
    const { id } = req.params;
    const idNumber = Number(id);
    const { type, message } = await salesService.findSaleById(idNumber);
    if (type) return res.status(errorMap.mapError(type)).json({ message });

    res.status(200).json(message);
};

const deleteSale = async (req, res) => {
    const { id } = req.params;
    const idSale = Number(id);
    const { type, message } = await salesService.deleteSale(idSale);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    return res.status(204).json(message);
};

module.exports = {
    insertSaleProduct,
    returnAllSales,
    returnSaleById,
    deleteSale,
};
