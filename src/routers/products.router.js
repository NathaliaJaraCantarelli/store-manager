const express = require('express');

const { productsController } = require('../controllers');

const router = express.Router();

router.get(
    '/',
    productsController.listProducts,
);

// router.get(
//     '/:id',
//     () => {}// fazer a função no controller
// );

module.exports = router;
