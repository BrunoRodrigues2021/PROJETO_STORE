const {StatusCodes: HttpCodes} = require('http-status-codes');
const SharedErrors = require('./shared-errors');

class AwsErrors extends SharedErrors {

    constructor() {
        super();
    }

    static get GET_PARAMETERS_FROM_PARAMETER_STORE_ERROR() {
        return {
            code: HttpCodes.INTERNAL_SERVER_ERROR,
            description: 'getParametersFromParameterStoreError'
        };
    }

    static get GET_SECRETS_ERROR() {
        return {
            code: HttpCodes.INTERNAL_SERVER_ERROR,
            description: 'getSecretsError'
        };
    }

    static get SET_SECRETS_ERROR() {
        return {
            code: HttpCodes.INTERNAL_SERVER_ERROR,
            description: 'setSecretsError'
        }
    }
}

module.exports = AwsErrors;