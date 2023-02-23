const returnSales = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

const sendProduct = { 
  idSale: 3, 
  saleDetails: [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

const sales = [{
  insertId: 1,
  date: '2023-02-23 17:31:46',
}];

module.exports = { returnSales, sendProduct, sales };
