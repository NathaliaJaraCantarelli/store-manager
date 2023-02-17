const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.post(
    '/',
    salesController.insertSaleProduct,
);

module.exports = router;
