const {StatusCodes: HttpCodes} = require('http-status-codes');
const SharedErrors = require('./shared-errors');

class ProductErrors extends SharedErrors {
    constructor() {
        super();
    }

    static get PRODUCT_NOT_FOUND() {
        return {
            code: HttpCodes.INTERNAL_SERVER_ERROR,
            description: 'productNotFound'
        };
    }
}

module.exports = ProductErrors;