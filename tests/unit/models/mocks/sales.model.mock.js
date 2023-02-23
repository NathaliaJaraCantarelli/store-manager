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

const allSales = [
  {
    "saleId": 1,
    "date": "2023-02-23T19:58:14.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-02-23T19:58:14.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-02-23T19:58:14.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const salesById = [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];

module.exports = {
  returnSales,
  sendProduct,
  sales,
  allSales,
  salesById,
};
