const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { products } = require('./mocks/products.model.mock');

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
    })

    afterEach(function () {
        sinon.restore();
    });
});
