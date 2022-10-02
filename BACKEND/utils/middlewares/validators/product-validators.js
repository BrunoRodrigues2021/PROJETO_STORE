const SharedValidators = require('./shared-validators');
const ProductErrors = require('../../errors/product-errors');

const logger = require("../../../logger");
const path = require('path');
const _fileName = path.basename(__filename);

class ProductValidators extends SharedValidators {
    constructor() {
        super();
        this.validateGetProductsRequest = this.validateGetProductsRequest.bind(this);
    }

    validateGetProductsRequest(request, response, next) {
        logger.info(`${_fileName} : Validating get all users`);

        const errors = [];

        if(errors.length) {
            const error = {
                ...ProductErrors.BAD_REQUEST,
                errors: [...new Set(errors)]
            };
            logger.warn(`${_fileName} : Error validating get all users : Error: ${JSON.stringify(error)}`);
            return response.status(ProductErrors.BAD_REQUEST.code).send({error});
        }


        next();
    }
}

module.exports = new ProductValidators();