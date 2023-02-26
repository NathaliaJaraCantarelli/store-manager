const { productsModel } = require('../models');
const schema = require('./validations/validationInputValues');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;
  
  const product = await productsModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = schema.validateNameProduct(name);
  if (error.type) return error;
  
  const newProductId = await productsModel.insertProduct({ name });
  const newProduct = await productsModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async ({ id, name }) => {
  const error = schema.validateNameProduct(name);
  if (error.type) return error;

  const product = await productsModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const update = await productsModel.updateProduct({ id, name });
  return { type: null, message: update };
};

const deleteProduct = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productsModel.deleteProduct(id);
  return { type: null, message: null };
};

const searchProduct = async (name) => {
  const result = await productsModel.searchProduct(name);
  return { type: null, message: result };
};

module.exports = {
    findAll,
    findById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
};
