const {StatusCodes: HttpCodes} = require('http-status-codes');
const SharedErrors = require('./shared-errors');

class UserErrors extends SharedErrors {
    constructor() {
        super();
    }

    static get USER_NOT_FOUND() {
        return {
            code: HttpCodes.INTERNAL_SERVER_ERROR,
            description: 'userNotFound'
        };
    }
}

module.exports = UserErrors;