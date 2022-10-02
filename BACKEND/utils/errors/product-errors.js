const {StatusCodes: HttpCodes} = require('http-status-codes');
const SharedErrors = require('./shared-errors');

class ProductErrors extends SharedErrors {
    constructor() {
        super();
    }
}

module.exports = ProductErrors;