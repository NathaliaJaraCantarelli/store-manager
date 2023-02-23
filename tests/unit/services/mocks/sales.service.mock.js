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

const bodyRequestNoId = [
  {
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const bodyRequestIdInvalid = [
  {
    "productId": 1,
    "quantity": 0
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const bodyRequestNotFound = [
  {
    "productId": 999,
    "quantity": 2
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

module.exports = {
    returnSales,
    bodyRequest,
    bodyRequestNoId,
    bodyRequestIdInvalid,
    bodyRequestNotFound,
};
  