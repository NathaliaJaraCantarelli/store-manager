const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { products, newProduct, updateProduct, productSearch } = require('./mocks/products.model.mock');

describe('Testes de unidade do model de produtos', function () {
    it('Retorna a lista de produtos', async function () {
        sinon.stub(connection, 'execute').resolves([products]);
        const result = await productsModel.findAll();
        expect(result).to.be.deep.equal(products);
    });

    it('Retorna um produto por seu id', async function () {
        sinon.stub(connection, 'execute').resolves([[products[0]]]);
        const result = await productsModel.findById(1);
        expect(result).to.be.deep.equal(products[0]);
    });

    it('Cadastrando novo produto', async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
        const result = await productsModel.insertProduct(newProduct);
        expect(result).to.be.equal(3);
    });

    it('Atualizando um produto', async function () {
        sinon.stub(connection, 'execute').resolves(updateProduct);
        const result = await productsModel.updateProduct(updateProduct);
        expect(result).to.be.deep.equal(updateProduct);
        
    });

    it('Deletando um produto', async function () {
        sinon.stub(connection, 'execute').resolves();
        const result = await productsModel.deleteProduct(1);
        expect(result).to.be.equal(true);
    });

    it('Pesquisando o nome de um produto', async function () {
        sinon.stub(connection, 'execute').resolves([productSearch]);
        const result = await productsModel.searchProduct('martelo');
        expect(result).to.be.deep.equal(productSearch);
    });

    afterEach(function () {
        sinon.restore();
    });
});
