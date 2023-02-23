const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { returnSales, sendProduct, sales } = require('./mocks/sales.model.mock');

describe('Testes da unidade model de vendas', function () {
    it('Retorna o objeto com o id e os itens vendidos', async function () {
        sinon.stub(connection, 'execute').resolves(returnSales);
        const result = await salesModel.insertSaleProduct(sendProduct);
        expect(result).to.be.deep.equal(returnSales);
    });

    it('Retorna o id da venda', async function () {
        sinon.stub(connection, 'execute').returns(sales);
        const result = await salesModel.insertSale();
        expect(result.insertId).to.be.deep.equal(1);
    });

    afterEach(function () {
        sinon.restore();
    });
});
