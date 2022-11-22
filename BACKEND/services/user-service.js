const User = require('../sequelize/models/user-model');
const {logger} = require("../logger");
const UserErrors = require("../utils/errors/user-errors");
const UserConstants = require("../utils/constants/user-constants");

const path = require("path");
const _fileName = path.basename(__filename);

class UserService {
    async getUsers() {}

    async insertUser() {
        const newUser = await User.create({
            name: 'Bruno',
            email: 'brunorodri2015@gemail.com'
        });

        return newUser;
    }

    async getUserByParam(param, value) {
        let user;

        try {
            user = await User.findOne({
                where: {[param]: value}
            })
        } catch (error) {
            logger.error(`${_fileName} : Error getting user by ${param} : User${param}: ${value} : Error: ${JSON.stringify(error)}`);
            throw UserErrors.DATABASE_ERROR;
        }

        if (!user) {
            throw UserErrors.USER_NOT_FOUND;
        }
    }

    async updateUser(userId, fields) {
        await this.getUserByParam(UserConstants.User.ID, userId);

        const transaction = await User.sequelize.transaction();

        try {
            const updateUserPayload = {};

            if (fields.name) {
                updateUserPayload.name = fields.name
            }
            if (fields.email) {
                updateUserPayload.email = fields.email
            }
            if (fields.password) {
                updateUserPayload.password = fields.password
            }
            if (fields.language) {
                updateUserPayload.language = fields.language
            }

            if (Object.keys(updateUserPayload).length > 0) {
                await User.update(updateUserPayload, {
                    where: {
                        id: userId
                    },
                    transaction
                });
            }

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            logger.error(`${_fileName} : Error updating user : UserId: ${userId} : Error: ${JSON.stringify(error)}`);
        }
    }

}

module.exports =  new UserService();
