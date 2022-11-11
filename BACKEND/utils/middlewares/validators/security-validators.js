const SharedValidators = require('./shared-validators');
const SecurityErrors = require('../../errors/security-errors');
const SharedValidationHelpers = require('../../validation-helpers/shared-validation-helpers');

const logger = require("../../../logger");
const path = require('path');
const _fileName = path.basename(__filename);

class SecurityValidators extends SharedValidators {
    constructor() {
        super();
        this.validateLoginRequest = this.validateLoginRequest.bind(this);
    }

    validateLoginRequest(request, response, next) {
        logger.info(`${_fileName} : Validating credentials`);

        const errors = [
            ...this._validateCredentials(request.body),
            ...this._validateRequestBodyParameters(request.body, ['email', 'password'])
        ];

        if(errors.length) {
            const error = {
                ...SecurityErrors.BAD_REQUEST,
                errors: [...new Set(errors)]
            };
            logger.warn(`${_fileName} : Error validating credentials : Error: ${JSON.stringify(error)}`);
            return response.status(SecurityErrors.BAD_REQUEST.code).send({error});
        }


        next();
    }

    _validateCredentials(requestBody) {
        const errors = [];

        if (SharedValidationHelpers.isMissing(requestBody.email) || SharedValidationHelpers.isMissing(requestBody.password)) {
            errors.push(SecurityErrors.MISSING_CREDENTIALS)
        }

        return errors;
    }
}

module.exports = new SecurityValidators();