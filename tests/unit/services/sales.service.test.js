const sinon = require('sinon');
const { expect } = require('chai');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const {  
    returnSales,
    bodyRequest,
    bodyRequestNoId,
    bodyRequestIdInvalid,
    bodyRequestNotFound
} = require('./mocks/sales.service.mock');

describe('Testa a unidade service de Vendas', function () {
    it('Retorna a venda inserida corretamente', async function () {
        sinon.stub(salesModel, 'insertSale').resolves(3);
        sinon.stub(salesModel, 'insertSaleProduct').resolves(returnSales);
        const result = await salesService.insertSaleProduct(bodyRequest);
        expect(result.type).to.be.equal(null);
        expect(result.message).to.be.deep.equal(returnSales)
    });

    it('Retorna um erro para inputs faltando', async function () {
        sinon.stub(salesModel, 'insertSale').resolves(3);
        sinon.stub(salesModel, 'insertSaleProduct').resolves(returnSales);
        const result = await salesService.insertSaleProduct(bodyRequestNoId);
        expect(result.type).to.be.equal('INVALID_INPUT');
    });

    it('Retorna um erro para valores invalidos', async function () {
        sinon.stub(salesModel, 'insertSale').resolves(3);
        sinon.stub(salesModel, 'insertSaleProduct').resolves(returnSales);
        const result = await salesService.insertSaleProduct(bodyRequestIdInvalid);
        expect(result.type).to.be.equal('INVALID_VALUE');
    });

    it('Retorna um erro para produto não encontrado', async function () {
        sinon.stub(salesModel, 'insertSale').resolves(3);
        sinon.stub(salesModel, 'insertSaleProduct').resolves(returnSales);
        const result = await salesService.insertSaleProduct(bodyRequestNotFound);
        expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
    });

    afterEach(function () {
        sinon.restore();
    });
});