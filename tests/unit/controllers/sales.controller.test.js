const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { bodyRequest, returnSales, bodyRequestInvalid } = require('./mocks/sales.controller.mock');

describe('Testando a unidade controller de vendas', function () {
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

    afterEach(function () {
        sinon.restore();
    });
});