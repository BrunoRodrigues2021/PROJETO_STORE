const {StatusCodes: HttpCodes} = require('http-status-codes');
const SharedErrors = require('./shared-errors');

class UserErrors extends SharedErrors {
    constructor() {
        super();
    }

    static get INVALID_CREDENTIALS() {
        return {
            code: HttpCodes.UNAUTHORIZED,
            description: 'invalidCredentials'
        }
    }
}

module.exports = UserErrors;