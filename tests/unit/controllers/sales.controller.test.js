const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const {
    bodyRequest,
    returnSales,
    bodyRequestInvalid,
    allSales,
    salesById,
} = require('./mocks/sales.controller.mock');

describe('Testando a unidade controller de vendas', function () {
    describe('Testes para validar e cadastrar vendas', function () {
        it('Retorna o objeto com o id da venda e os produtos vendidos', async function () {
            const res = {};
            const req = {
                body: bodyRequest
            };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(salesService, 'insertSaleProduct').resolves({ type: null, message: returnSales });

            await salesController.insertSaleProduct(req, res);

            expect(res.status).to.have.been.calledWith(201);
            expect(res.json).to.have.been.calledWith(returnSales);
        });

        it('Retorna o objeto com o id da venda e os produtos vendidos', async function () {
            const res = {};
            const req = {
                body: bodyRequestInvalid
            };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(salesService, 'insertSaleProduct')
                .resolves({ type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' });

            await salesController.insertSaleProduct(req, res);

            expect(res.status).to.have.been.calledWith(422);
            expect(res.json).to.have.been.calledWith('"quantity" must be greater than or equal to 1');
        });
    });

    describe('Testa o retorno das vendas', function () {
        it('Retorna todas as vendas', async function () {
            const res = {};
            const req = {};
            
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(salesService, 'findAllSales')
                .resolves({ type: null, message: allSales });
    
            await salesController.returnAllSales(req, res);
    
            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(allSales);
        });

        it('Retorna as vendas pelo idSale', async function () {
            const res = {};
            const req = {
                params: 1,
            };
            
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(salesService, 'findSaleById')
                .resolves({ type: null, message: salesById });
    
            await salesController.returnSaleById(req, res);
    
            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(salesById);
        });

        it('Retorna um erro com o idSale que não existe', async function () {
            const res = {};
            const req = {
                params: 999,
            };
            
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(salesService, 'findSaleById')
                .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
    
            await salesController.returnSaleById(req, res);
    
            expect(res.status).to.have.been.calledWith(404);
            expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
        });
    });

    describe('Deletando uma venda', function () {
        it('Retorna true quando uma venda é deletada', async function () {
            const res = {};
            const req = {
                params: { id: 1 },
            };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(salesService, 'deleteSale')
                .resolves({ type: null, message: null });
            
            await salesController.deleteSale(req, res);

            expect(res.status).to.have.been.calledWith(204);
        });
        it('Retorna Not Found quando a venda não existe', async function () {
            const res = {};
            const req = {
                params: { id: 999 },
            };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(salesService, 'deleteSale')
                .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
            
            await salesController.deleteSale(req, res);

            expect(res.status).to.have.been.calledWith(404);
            expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
        });
    });


    afterEach(function () {
        sinon.restore();
    });
});