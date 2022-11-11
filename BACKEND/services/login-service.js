const logger = require('../logger');
const SecurityErrors = require('../utils/errors/security-errors');
const HttpStatus = require('http-status-codes');
const User = require("../sequelize/models/user-model");

const _fileName = module.filename.split("/").pop();

class LoginService {

    async login(credentials) {
        const user = await this.checkPassword(credentials);
        if (!user) {
            logger.warn(`${_fileName} - Invalid credentials - Email: ${credentials.email}`);
            throw SecurityErrors.INVALID_CREDENTIALS;
        } else {
            logger.info(`${_fileName} - Successfully credentials validated - Email: ${credentials.email}`);
            return user;
        }
    }

    async checkPassword(credentials){
        return await User.findOne({
            attributes: ['id', 'name', 'email', 'language', 'userActive'],
            where: {email: credentials.email , password: credentials.password}
        })
    }

}

module.exports = new LoginService();