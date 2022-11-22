const express = require('express');
const router = express.Router();
const {StatusCodes} = require('http-status-codes');
const UserValidatorMiddlewares = require('../utils/middlewares/validators/user-validators');
const UserService = require('../services/user-service');
const logger = require('../logger');
const SecurityMiddlewares = require("../utils/middlewares/security-middlewares");
const ParseMiddlewares = require("../utils/middlewares/parse-middlewares");

const path = require('path');
const _fileName = path.basename(__filename);

class UserController {
    constructor() {
        router.get('/',
            SecurityMiddlewares.authenticateRequest,
            UserValidatorMiddlewares.validateGetUsersRequest,
            this._handleGetUsers
        );

        router.get('/:id',
            this._handleGetUserById
        );

        router.post('/',
            this._handleInsertUser
        );

        router.put('/:id',
            SecurityMiddlewares.authenticateRequest,
            ParseMiddlewares.parseMultidataForm,
            UserValidatorMiddlewares.validateUpdateUserRequest,
            this._handleUpdateUser
        );

        router.delete('/',
            this._handleDeleteUser
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
            const id = request.params.id;

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

    async _handleUpdateUser(request, response) {
        logger.info(`${_fileName} : Getting all users`);
        try {
            logger.info(`${_fileName} : Successfully getting all users`);
            await UserService.updateUser(+request.params.id, request.body);
            response.status(StatusCodes.OK).send();
        } catch (error) {
            logger.error(`${_fileName} : Error getting all users : Error: ${JSON.stringify(error)}`);
            response.status(error.code).send({error: error});
        }
    }

    async _handleDeleteUser(request, response) {
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