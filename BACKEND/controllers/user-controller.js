const express = require('express');
const router = express.Router();
const {StatusCodes} = require('http-status-codes');
const UserValidatorMiddlewares = require('../utils/middlewares/validators/user-validators');
const UserService = require('../services/user-service');

const logger = require('../logger');
const path = require('path');
const _fileName = path.basename(__filename);

class UserController {
    constructor() {
        router.get('/',
            UserValidatorMiddlewares.validateGetUsersRequest,
            this._handleGetUsers
        );

        router.get('/:user_id',
            this._handleGetUserById
        );

        router.post('/',
            this._handleInsertUser
        );

        router.patch('/',
            this._handleUpdateUsers
        );

        router.delete('/',
            this._handleDeleteUsers
        );
    }

    async _handleGetUsers(request, response) {
        logger.info(`${_fileName} : Getting all users`);
        try {
            logger.info(`${_fileName} : Successfully getting all users`);
            const users = await UserService.getUsers();
            response.status(StatusCodes.OK).send({
                message: 'Using GET users'
            });
        } catch (error) {
            logger.error(`${_fileName} : Error getting all users : Error: ${JSON.stringify(error)}`);
        }
    }

    async _handleGetUserById(request, response) {
        logger.info(`${_fileName} : Getting all users`);
        try {
            const id = request.params.user_id;

            logger.info(`${_fileName} : Successfully getting all users`);
            response.status(StatusCodes.OK).send({
                message: 'Using GET user By ID',
                id: id
            });
        } catch (error) {
            logger.error(`${_fileName} : Error getting all users : Error: ${JSON.stringify(error)}`);
        }
    }

    async _handleInsertUser(request, response) {
        logger.info(`${_fileName} : Getting all users`);
        try {
            logger.info(`${_fileName} : Successfully getting all users`);
            await UserService.insertUser();
            response.status(StatusCodes.CREATED).send({
                message: 'Using POST users'
            });
        } catch (error) {
            logger.error(`${_fileName} : Error getting all users : Error: ${JSON.stringify(error)}`);
        }
    }

    async _handleUpdateUsers(request, response) {
        logger.info(`${_fileName} : Getting all users`);
        try {
            logger.info(`${_fileName} : Successfully getting all users`);
            response.status(StatusCodes.OK).send({
                message: 'Using PATCH users'
            });
        } catch (error) {
            logger.error(`${_fileName} : Error getting all users : Error: ${JSON.stringify(error)}`);
        }
    }

    async _handleDeleteUsers(request, response) {
        logger.info(`${_fileName} : Getting all users`);
        try {
            logger.info(`${_fileName} : Successfully getting all users`);
            response.status(StatusCodes.OK).send({
                message: 'Using DELETE users'
            });
        } catch (error) {
            logger.error(`${_fileName} : Error getting all users : Error: ${JSON.stringify(error)}`);
        }
    }
}

new UserController();
module.exports = router;