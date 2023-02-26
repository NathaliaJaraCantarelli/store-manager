const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.post(
    '/',
    salesController.insertSaleProduct,
);

router.get(
    '/',
    salesController.returnAllSales,
);

router.get(
    '/:id',
    salesController.returnSaleById,
);

router.delete(
    '/:id',
    salesController.deleteSale,
);

router.put(
    '/:id',
    salesController.updateSale,
);

module.exports = router;
