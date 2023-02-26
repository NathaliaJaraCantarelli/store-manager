const sinon = require('sinon');
const { expect } = require('chai');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const {  
    returnSales,
    bodyRequest,
    bodyRequestNoId,
    bodyRequestIdInvalid,
    bodyRequestNotFound,
    allSales,
    salesById,
    returnSalesUpdate,
    bodyRequestUpdate,
    updateResponse,
} = require('./mocks/sales.service.mock');

describe('Testa a unidade service de Vendas', function () {
    describe('Testes para validar e cadastrar vendas', function () {
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
    });

    describe('Testa o retorno das vendas', function () {
        it('Retorna todas as vendas', async function () {
            sinon.stub(salesModel, 'findAllSales').resolves(allSales);
            const result = await salesService.findAllSales();
            expect(result.type).to.be.equal(null);
            expect(result.message).to.be.deep.equal(allSales);
        });

        it('Retorna as vendas de acordo com o id', async function () {
            sinon.stub(salesModel, 'findSaleById').resolves(salesById);
            const result = await salesService.findSaleById(1);
            expect(result.type).to.be.equal(null);
            expect(result.message).to.be.deep.equal(salesById);
        });

        it('Retorna um erro se o idSale não existe', async function () {
            sinon.stub(salesModel, 'findSaleById').resolves([]);
            const result = await salesService.findSaleById(999);
            expect(result.type).to.be.equal('SALE_NOT_FOUND');
            expect(result.message).to.be.deep.equal('Sale not found');
        });
    });

    describe('Deletando uma venda', function () {
        it('Retorna true quando uma venda é deletada', async function () {
            sinon.stub(salesModel,'findSaleById').resolves(salesById);
            sinon.stub(salesModel, 'deleteSale').resolves(true);
            sinon.stub(salesModel,'deleteSaleProducts').resolves(true);
            const result = await salesService.deleteSale(1);
            expect(result.type).to.be.equal(null);
            expect(result.message).to.be.equal(null);
        });
        it('Retorna Not Found quando o id não existe', async function () {
            sinon.stub(salesModel,'findSaleById').resolves(false);
            const result = await salesService.deleteSale(999);
            expect(result.type).to.be.equal('SALE_NOT_FOUND');
            expect(result.message).to.be.equal('Sale not found');
        });
    });

    describe('Atualizando uma venda', function () {
        it('Retorna a venda atualizada', async function () {
            sinon.stub(salesModel, 'deleteSaleProducts').resolves(true);
            sinon.stub(salesModel, 'insertSaleProduct').resolves(returnSalesUpdate);
            const result = await salesService.updateSale({ idSale: 1, saleDetails: bodyRequestUpdate });
            expect(result.type).to.be.equal(null);
            expect(result.message).to.be.deep.equal(updateResponse);
        });

        it('Retorna Not Found quando o id da venda não existe', async function () {
            sinon.stub(salesModel, 'deleteSaleProducts').resolves(false);
            sinon.stub(salesModel, 'insertSaleProduct').resolves([]);
            const result = await salesService.updateSale({ idSale: 999, saleDetails: bodyRequestUpdate });
            expect(result.type).to.be.equal('SALE_NOT_FOUND');
            expect(result.message).to.be.deep.equal('Sale not found');
        });

        it('Retorna um erro quando não é enviado um dos campos', async function () {
            sinon.stub(salesModel, 'deleteSaleProducts').resolves(false);
            sinon.stub(salesModel, 'insertSaleProduct').resolves([]);
            const result = await salesService.updateSale({ idSale: 1, saleDetails: bodyRequestNoId });
            expect(result.type).to.be.equal('INVALID_INPUT');
            expect(result.message).to.be.deep.equal('"productId" is required');
        });

        it('Retorna Not Found quando o id do produto não existe', async function () {
            sinon.stub(salesModel, 'deleteSaleProducts').resolves(false);
            sinon.stub(salesModel, 'insertSaleProduct').resolves([]);
            const result = await salesService.updateSale({ idSale: 1, saleDetails: bodyRequestNotFound });
            expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
            expect(result.message).to.be.deep.equal('Product not found');
        });
    });

    afterEach(function () {
        sinon.restore();
    });
});