const connection = require('./connection');

const insertSale = async () => {
    const [{ insertId }] = await connection.execute(
        'INSERT INTO sales (date) VALUE (NOW())',
    );

    return { insertId };
};

const insertSaleProduct = async ({ idSale, saleDetails }) => {
    saleDetails.forEach((product) => {
        connection.execute(
            `INSERT INTO sales_products (sale_id, product_id, quantity) 
            VALUE (?, ?, ?)`,
            [idSale, product.productId, product.quantity],
        );
    });

    return { id: idSale, itemsSold: saleDetails };
};

module.exports = {
    insertSale,
    insertSaleProduct,
};
