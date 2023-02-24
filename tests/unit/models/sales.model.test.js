const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const {
    returnSales,
    sendProduct,
    sales,
    allSales,
    salesById,
} = require('./mocks/sales.model.mock');

describe('Testes da unidade model de vendas', function () {
    describe('Testes para validar e cadastrar vendas', function () {
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
    });

    describe('Testa o retorno das vendas', function () {
        it('Retorna todas as vendas', async function () {
            sinon.stub(connection, 'execute').resolves([allSales]);
            const result = await salesModel.findAllSales();
            expect(result).to.be.deep.equal(allSales);
        });
        
        it('Retorna as vendas de um idSale', async function () {
            sinon.stub(connection, 'execute').resolves([salesById]);
            const result = await salesModel.findSaleById(1);
            expect(result).to.be.deep.equal(salesById);
        });
    });

    describe('Testa se é deletado uma venda', function () {
        it('É deletado uma venda da tabela sales', async function () {
            sinon.stub(connection, 'execute').resolves(true);
            const result = await salesModel.deleteSale(1);
            expect(result).to.be.equal(true);
        });

        it('É deletado uma venda da tabela sales_products', async function () {
            sinon.stub(connection, 'execute').resolves(true);
            const result = await salesModel.deleteSaleProducts(1);
            expect(result).to.be.equal(true);
        });
    });
    

    afterEach(function () {
        sinon.restore();
    });
});
