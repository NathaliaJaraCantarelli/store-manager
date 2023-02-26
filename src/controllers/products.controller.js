const errorMap = require('../utils/errorMap');
const { productsService } = require('../services');

const listProducts = async (_req, res) => {
    const { message } = await productsService.findAll();

    res.status(200).json(message);
};

const getProduct = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await productsService.findById(id);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    res.status(200).json(message);
};

const createProduct = async (req, res) => {
    const { name } = req.body;

    const { type, message } = await productsService.createProduct(name);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    res.status(201).json(message);
};

const updateProduct = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    const { type, message } = await productsService
        .updateProduct({ id, name });

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await productsService.deleteProduct(id);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    res.status(204).json(message);
};

const searchProduct = async (req, res) => {
    const { q } = req.query;
    const { message } = await productsService.searchProduct(q);
    res.status(200).json(message);
};

module.exports = {
    listProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
};
