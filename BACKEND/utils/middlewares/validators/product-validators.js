const SharedValidators = require('./shared-validators');
const ProductConstants = require('../../constants/product-constants');
const SharedConstants = require('../../constants/shared-constants');
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
        logger.info(`${_fileName} : Validating get all products`);

        const {name, sortBy, sortOrder, page, pageSize} = request.query;

        const errors = [
            ...this._validateName(name, false),
            ...this._validateSortBy(sortBy, Object.values(ProductConstants.SortBy.EXPECTED_VALID_SORT_BY), false),
            ...this._validateSortOrder(sortOrder, Object.values(SharedConstants.SortOrder), false),
            ...this._validatePage(page, false),
            ...this._validatePageSize(pageSize, false),
            ...this._validatePagination(page, pageSize, false)
        ];

        if(errors.length) {
            const error = {
                ...ProductErrors.BAD_REQUEST,
                errors: [...new Set(errors)]
            };
            logger.warn(`${_fileName} : Error validating get all products : Error: ${JSON.stringify(error)}`);
            return response.status(ProductErrors.BAD_REQUEST.code).send({error});
        }

        next();
    }
}

module.exports = new ProductValidators();