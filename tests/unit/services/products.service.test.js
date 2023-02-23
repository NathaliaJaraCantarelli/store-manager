const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const {
    products,
    validName,
    updateProduct,
    updateProductNoName,
    updateProductIdInvalid
} = require('./mocks/products.service.mock');


describe('Testando a unidade service de produtos', function () {
    describe('Listando os produtos', function () {
        it('Retorna a lista completa de produtos', async function () {
            sinon.stub(productsModel, 'findAll').resolves(products);
            const result = await productsService.findAll();
            expect(result.type).to.be.equal(null);
            expect(result.message).to.be.deep.equal(products);
        });
    });

    describe('Buscando produto pelo id', function () {
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
    });

    describe('Criando um novo produto', function () {
        it('Retorna o id do produto cadastrado', async function () {
            sinon.stub(productsModel, 'insertProduct').resolves(1);
            sinon.stub(productsModel, 'findAll').resolves(products[0]);
            const result = await productsService.createProduct(validName);
            expect(result.type).to.be.equal(null);
            expect(result.message).to.be.deep.equal(products[0]);
        });

        it('Retorna um erro ao não enviar um nome', async function () {
            sinon.stub(productsModel, 'insertProduct').resolves(3);
            sinon.stub(productsModel, 'findAll').resolves(products[2]);
            const result = await productsService.createProduct();
            expect(result.type).to.be.equal('INVALID_VALUE');
            expect(result.message).to.be.deep.equal('"name" is required');
        });

        it('Retorna um erro ao enviar um nome com menos de 5 caracteres', async function () {
            sinon.stub(productsModel, 'insertProduct').resolves(3);
            sinon.stub(productsModel, 'findAll').resolves(products[2]);
            const result = await productsService.createProduct('Nome');
            expect(result.type).to.be.equal('INVALID_VALUE');
            expect(result.message).to.be.deep.equal('"name" length must be at least 5 characters long');
        });
    });

    describe('Atualizando um produto', function () {
        it('Retorna o produto atualizado', async function () {
            sinon.stub(productsModel, 'updateProduct').resolves(updateProduct);
            const result = await productsService.updateProduct(updateProduct);
            expect(result.type).to.be.equal(null);
            expect(result.message).to.be.deep.equal(updateProduct);
        });

        it('Retorna um erro quando não é enviado nome', async function () {
            sinon.stub(productsModel, 'updateProduct').resolves(updateProductNoName);
            const result = await productsService.updateProduct(updateProductNoName);
            expect(result.type).to.be.equal('INVALID_VALUE');
            expect(result.message).to.be.deep.equal('"name" is required');
        });

        it('Retorna um erro quando o produto não é encontrado', async function () {
            sinon.stub(productsModel, 'updateProduct').resolves(updateProductIdInvalid);
            const result = await productsService.updateProduct(updateProductIdInvalid);
            expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
            expect(result.message).to.be.deep.equal('Product not found');
        });
    });

    afterEach(function () {
        sinon.restore();
    });
});
