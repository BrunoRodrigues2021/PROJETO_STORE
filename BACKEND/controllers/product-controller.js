const express = require('express');
const router = express.Router();
const {StatusCodes} = require('http-status-codes');
const ProductValidatorMiddlewares = require('../utils/middlewares/validators/product-validators');
const ProductService = require('../services/product-service');

const logger = require('../logger');
const path = require('path');
const _fileName = path.basename(__filename);

class ProductController {
    constructor() {
        router.get('/',
            ProductValidatorMiddlewares.validateGetProductsRequest,
            this._handleGetProducts
        );

        router.get('/:product_id',
            this._handleGetProductById
        );

        router.post('/',
            this._handleInsertProducts
        );

        router.patch('/',
            this._handleUpdateProducts
        );

        router.delete('/',
            this._handleDeleteProducts
        );
    }

    async _handleGetProducts(request, response) {
        logger.info(`${_fileName} : Getting all products`);
        try {
            logger.info(`${_fileName} : Successfully getting all products`);
            const products = await ProductService.getProducts();
            response.status(StatusCodes.OK).send(products);
        } catch (error) {
            logger.error(`${_fileName} : Error getting all products : Error: ${JSON.stringify(error)}`);
        }
    }

    async _handleGetProductById(request, response) {
        logger.info(`${_fileName} : Getting all products`);
        try {
            const id = request.params.product_id;

            logger.info(`${_fileName} : Successfully getting all products`);
            response.status(StatusCodes.OK).send({
                message: 'Using GET product By ID',
                id: id
            });
        } catch (error) {
            logger.error(`${_fileName} : Error getting all products : Error: ${JSON.stringify(error)}`);
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

    async _handleUpdateProducts(request, response) {
        logger.info(`${_fileName} : Getting all products`);
        try {
            logger.info(`${_fileName} : Successfully getting all products`);
            response.status(StatusCodes.OK).send({
                message: 'Using PATCH products'
            });
        } catch (error) {
            logger.error(`${_fileName} : Error getting all products : Error: ${JSON.stringify(error)}`);
        }
    }

    async _handleDeleteProducts(request, response) {
        logger.info(`${_fileName} : Getting all products`);
        try {
            logger.info(`${_fileName} : Successfully getting all products`);
            response.status(StatusCodes.OK).send({
                message: 'Using DELETE products'
            });
        } catch (error) {
            logger.error(`${_fileName} : Error getting all products : Error: ${JSON.stringify(error)}`);
        }
    }
}


new ProductController();
module.exports = router;