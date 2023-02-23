const returnSales = {
    "id": {
      "insertId": 3
    },
    "itemsSold": [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 3
      }
    ]
  };

const bodyRequest = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const bodyRequestInvalid = [
  {
    "productId": 1,
    "quantity": 0
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

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
    "date": "2023-02-23T19:58:14.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-02-23T19:58:14.000Z",
    "productId": 2,
    "quantity": 10
  }
];

module.exports = {
    returnSales,
    bodyRequest,
    bodyRequestInvalid,
    allSales,
    salesById,
};
