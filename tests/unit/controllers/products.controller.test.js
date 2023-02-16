const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { products } = require('./mocks/products.controller.mock');

describe('Testando a unidade controller de produtos', function () {
    it('Retorna a lista completa de produtos', async function () {
        const res = {};
        const req = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'findAll').resolves({ type: null, message: products });

        await productsController.listProducts(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(products);
    });

    it('Retorna o produto de acordo com o id', async function () {
        const res = {};
        const req = {
            params: { id: 1 },
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'findById').resolves({ type: null, message: products[0] });

        await productsController.getProduct(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(products[0]);
    });

    it('Retorna o produto de acordo com o id', async function () {
        const res = {};
        const req = {
            params: { id: 'a' },
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'findById').resolves({ type: 'INVALID_VALUE', message: 'ID invalid' });

        await productsController.getProduct(req, res);

        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith({ message: 'ID invalid' });
    });

    it('Retorna o produto de acordo com o id', async function () {
        const res = {};
        const req = {
            params: { id: 5 },
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'findById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

        await productsController.getProduct(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    afterEach(function () {
        sinon.restore();
    });
});
