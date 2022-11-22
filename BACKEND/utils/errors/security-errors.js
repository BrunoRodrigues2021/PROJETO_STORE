const SharedErrors = require("./shared-errors");
const {StatusCodes: HttpCodes} = require("http-status-codes");

class SecurityErrors extends SharedErrors {
    constructor() {
        super();
    }

    static get TOKEN_EXPIRED() {
        return {
            code: HttpCodes.INTERNAL_SERVER_ERROR,
            description: 'tokenExpired'
        }
    }

    static get MISSING_CREDENTIALS() {
        return {
            code: HttpCodes.UNAUTHORIZED,
            description: 'missingCredentials'
        }
    }

    static get INVALID_CREDENTIALS() {
        return {
            code: HttpCodes.UNAUTHORIZED,
            description: 'invalidCredentials'
        }
    }
}

module.exports = SecurityErrors;