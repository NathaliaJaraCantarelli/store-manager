const express = require('express');

const { productsController } = require('../controllers');
const validateNewProduct = require('../middlewares/validateNewProduct');

const router = express.Router();

router.get(
    '/search', 
    productsController.searchProduct,
);

router.get(
    '/',
    productsController.listProducts,
);

router.get(
    '/:id',
    productsController.getProduct,
);

router.post(
    '/',
    validateNewProduct,
    productsController.createProduct,
);

router.put(
    '/:id',
    validateNewProduct,
    productsController.updateProduct,
);

router.delete(
    '/:id',
    productsController.deleteProduct,
);

module.exports = router;
