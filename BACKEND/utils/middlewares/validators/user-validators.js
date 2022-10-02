const SharedValidators = require('./shared-validators');
const UserErrors = require('../../errors/user-errors');

const logger = require("../../../logger");
const path = require('path');
const _fileName = path.basename(__filename);

class UserValidators extends SharedValidators {
    constructor() {
        super();
        this.validateGetUsersRequest = this.validateGetUsersRequest.bind(this);
    }

    validateGetUsersRequest(request, response, next) {
        logger.info(`${_fileName} : Validating get all users`);

        const errors = [];

        if(errors.length) {
            const error = {
                ...UserErrors.BAD_REQUEST,
                errors: [...new Set(errors)]
            };
            logger.warn(`${_fileName} : Error validating get all users : Error: ${JSON.stringify(error)}`);
            return response.status(UserErrors.BAD_REQUEST.code).send({error});
        }


        next();
    }
}

module.exports = new UserValidators();