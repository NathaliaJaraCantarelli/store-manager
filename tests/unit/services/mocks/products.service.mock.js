const products = [
  {
    id: 1,
    name: "Martelo de Thor"
  },
  {
    id: 2,
    name: "Traje de encolhimento"
  }
];

const validName = "Escudo do Capitão América";

const updateProduct = {
  "id": 1,
  "name": "Tridente"
};

const updateProductNoName = {
  "id": 1
};

const updateProductIdInvalid = {
  "id": 999,
  "name": "Tridente"
};

const productSearch = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  }
];

module.exports = {
    products,
    validName,
    updateProduct,
    updateProductNoName,
    updateProductIdInvalid,
    productSearch,
};
  