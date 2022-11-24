const express = require('express');
const router = express.Router();
const {StatusCodes} = require('http-status-codes');
const ProductValidatorMiddlewares = require('../utils/middlewares/validators/product-validators');
const ProductService = require('../services/product-service');
const SecurityMiddlewares = require("../utils/middlewares/security-middlewares");

const logger = require('../logger');
const path = require('path');
const ParseMiddlewares = require("../utils/middlewares/parse-middlewares");
const _fileName = path.basename(__filename);

class ProductController {
    constructor() {
        router.get('/',
            SecurityMiddlewares.authenticateRequest,
            ProductValidatorMiddlewares.validateGetProductsRequest,
            this._handleGetProducts
        );

        router.get('/:id',
            SecurityMiddlewares.authenticateRequest,
            this._handleGetProduct
        );

        router.post('/',
            SecurityMiddlewares.authenticateRequest,
            this._handleInsertProducts
        );

        router.patch('/:id',
            SecurityMiddlewares.authenticateRequest,
            this._handleUpdateProduct
        );

        router.delete('/',
            ParseMiddlewares.parseMultidataForm,
            SecurityMiddlewares.authenticateRequest,
            this._handleDeleteProducts
        );
    }

    async _handleGetProducts(request, response) {
        logger.info(`${_fileName} : Getting all products`);
        const {name, value, sortBy, sortOrder, page, pageSize} = request.query;

        try {
            logger.info(`${_fileName} : Successfully getting all products`);
            const products = await ProductService.getProducts(name, value, sortBy, sortOrder, page, pageSize);
            response.status(StatusCodes.OK).send(products);
        } catch (error) {
            logger.error(`${_fileName} :
            Error getting all products : Error: ${JSON.stringify(error)}`);
            response.status(error.code).send({error: error});
        }
    }

    async _handleGetProduct(request, response) {
        logger.info(`${_fileName} : Getting product ${+request.params.id}`);
        try {
            logger.info(`${_fileName} : Successfully getting product ${+request.params.id}`);
            const product = await  ProductService.getProductByParam('id', +request.params.id);
            response.status(StatusCodes.OK).send(product);
        } catch (error) {
            logger.error(`${_fileName} : Error getting product ${+request.params.id} : Error: ${JSON.stringify(error)}`);
            response.status(error.code).send({error: error});
        }
    }

    async _handleInsertProducts(request, response) {
        logger.info(`${_fileName} : Getting all products`);
        try {
            logger.info(`${_fileName} : Successfully getting all products`);
            await ProductService.insertProduct();
            response.status(StatusCodes.CREATED).send({
                message: 'Using POST products'
            });
        } catch (error) {
            logger.error(`${_fileName} : Error getting all products : Error: ${JSON.stringify(error)}`);
        }
    }

    async _handleUpdateProduct(request, response) {
        logger.info(`${_fileName} : Updating product`);
        try {
            logger.info(`${_fileName} : Successfully updating product`);
            await ProductService.updateProduct(+request.params.id, request.body);
            response.status(StatusCodes.OK).send();
        } catch (error) {
            logger.error(`${_fileName} : Error updating product : Error: ${JSON.stringify(error)}`);
            response.status(error.code).send({error: error});
        }
    }

    async _handleDeleteProducts(request, response) {
        logger.info(`${_fileName} : Deleting products`);
        try {
            logger.info(`${_fileName} : Successfully deleted products`);
            await ProductService.deleteProduct(JSON.parse(request.body.listOfProductId));
            response.status(StatusCodes.OK).send();
        } catch (error) {
            logger.error(`${_fileName} : Error deleting products : Error: ${JSON.stringify(error)}`);
            response.status(error.code).send({error: error});
        }
    }
}


new ProductController();
module.exports = router;