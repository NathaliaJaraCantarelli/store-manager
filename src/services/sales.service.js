const { salesModel } = require('../models');
const { findById } = require('./products.service');
const schema = require('./validations/validationInputValues');

const insertSaleProduct = async (saleDetails) => {
    const errorsSale = saleDetails.map((sale) => schema.validateSalesProduct(sale));
    const error = errorsSale.find((err) => err.type !== '');
    if (error) return { type: error.type, message: error };

    const notFoundMessage = { message: 'Product not found' };
    const verifyIdProduct = await Promise
        .all(saleDetails.map((saleId) => findById(saleId.productId)));
    const errorNotFound = verifyIdProduct
        .find((errNF) => errNF.type);
    if (errorNotFound) return { type: 'PRODUCT_NOT_FOUND', message: notFoundMessage };

    const idSale = await salesModel.insertSale();
    const newInsertSaleProduct = await salesModel
        .insertSaleProduct({ idSale: idSale.insertId, saleDetails });
    return { type: null, message: newInsertSaleProduct };
};

const findAllSales = async () => {
    const allSales = await salesModel.findAllSales();
    return { type: null, message: allSales };
};

const findSaleById = async (idSale) => {
    const saleById = await salesModel.findSaleById(idSale);
    if (!saleById.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

    return { type: null, message: saleById };
};

module.exports = {
    insertSaleProduct,
    findAllSales,
    findSaleById,
};
