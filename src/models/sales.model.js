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

const findAllSales = async () => {
    const [result] = await connection.execute(
        `SELECT 
            sp.sale_id AS saleId,
            ss.date AS date,
            sp.product_id AS productId,
            sp.quantity AS quantity
        FROM sales AS ss
        INNER JOIN sales_products AS sp
        ON ss.id = sp.sale_id`,
    );

    return result;
};

const findSaleById = async (idSale) => {
    const [result] = await connection.execute(
        `SELECT 
            ss.date AS date,
            sp.product_id AS productId,
            sp.quantity AS quantity
        FROM sales AS ss
        INNER JOIN sales_products AS sp
        ON ss.id = sp.sale_id
        WHERE id = ?`,
        [idSale],
    );

    return result;
};

const deleteSale = async (idSale) => {
    await connection.execute(
        'DELETE FROM sales WHERE id = ?',
        [idSale],
    );
    return true;
};

const deleteSaleProducts = async (idSale) => {
    await connection.execute(
        'DELETE FROM sales_products WHERE sale_id = ?',
        [idSale],
    );
    return true;
};

module.exports = {
    insertSale,
    insertSaleProduct,
    findAllSales,
    findSaleById,
    deleteSale,
    deleteSaleProducts,
};
