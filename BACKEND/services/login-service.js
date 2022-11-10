const logger = require('../logger');
const UserErrors = require('../utils/errors/user-errors');
const HttpStatus = require('http-status-codes');
const User = require("../sequelize/models/user-model");

const _fileName = module.filename.split("/").pop();

class LoginService {

    async login(credentials) {
        const user = await this.checkPassword(credentials);
        if (!user) {
            logger.warn(`${_fileName} - Invalid credentials - Email: ${credentials.email}`);
            return {
                status: HttpStatus.FORBIDDEN,
                responseBody: {error: UserErrors.INVALID_CREDENTIALS}
            };
        } else {
            logger.info(`${_fileName} - Identified first login - Email: ${credentials.email}`);
            return user;
        }
    }

    async checkPassword(credentials){
        return await User.findOne({
            attributes: ['id', 'name', 'mail'],
            where: {mail: credentials.email , password: credentials.password}
        })
    }

}

module.exports = new LoginService();