const {StatusCodes: HttpCodes} = require('http-status-codes');
const SharedErrors = require('./shared-errors');

class UserErrors extends SharedErrors {
    constructor() {
        super();
    }
}

module.exports = UserErrors;