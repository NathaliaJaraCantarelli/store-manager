const connection = require('./connection');

const findAll = async () => {
    const [result] = await connection.execute(
        'SELECT * FROM products ORDER BY id',
    );
    return result;
};

const findById = async (productId) => {
    const [[product]] = await connection.execute(
        'SELECT * FROM products WHERE id = ?',
        [productId],
    );
    return product;
};

const insertProduct = async (product) => {
    const columns = Object.keys(product).join(', ');

    const placeholders = Object.keys(product).map((_key) => '?').join(', ');

    const [{ insertId }] = await connection.execute(
        `INSERT INTO products (${columns}) VALUE (${placeholders})`,
        [...Object.values(product)],
    );

    return insertId;
};

const updateProduct = async ({ id, name }) => {
    await connection.execute(
        'UPDATE products SET name = ? WHERE id = ?',
        [name, id],
    );
    return { id, name };
};

const deleteProduct = async (id) => {
    await connection.execute(
        'DELETE FROM products WHERE id = ?',
        [id],
    );
    
    return true;
};

const searchProduct = async (name) => {
    const [result] = await connection.execute(
        `SELECT * FROM products WHERE name LIKE "%${name}%"`,
    );
    return result;
};

module.exports = {
    findAll,
    findById,
    insertProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
};
