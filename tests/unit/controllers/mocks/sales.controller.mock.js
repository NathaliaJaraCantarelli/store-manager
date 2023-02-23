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

module.exports = {
    returnSales,
    bodyRequest,
    bodyRequestInvalid,
};
