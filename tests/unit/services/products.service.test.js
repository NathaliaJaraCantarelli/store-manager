const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { products } = require('./mocks/products.service.mock');


describe('Testando a unidade service de produtos', function () {
    it('Retorna a lista completa de produtos', async function () {
        sinon.stub(productsModel, 'findAll').resolves(products);
        const result = await productsService.findAll();
        expect(result.type).to.be.equal(null);
        expect(result.message).to.be.deep.equal(products);
    });

    it('Retorna um erro ao buscar um produto com id invalido', async function () {
        const result = await productsService.findById('a');
        expect(result.type).to.be.equal('INVALID_VALUE');
        expect(result.message).to.be.equal('ID invalid');
    });

    it('Retorna um erro ao buscar um id não existente', async function () {
        const result = await productsService.findById(5);
        expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
        expect(result.message).to.be.equal('Product not found');
    });

    it('Retorna o prosuto correspondente ao id', async function () {
        sinon.stub(productsModel, 'findById').resolves(products[0])
        const result = await productsService.findById(1);
        expect(result.type).to.be.equal(null);
        expect(result.message).to.be.deep.equal(products[0]);
    });

    afterEach(function () {
        sinon.restore();
    });
});
