const express = require('express');
const router = express.Router();
const {StatusCodes} = require('http-status-codes');

const SecurityValidatorMiddlewares = require('../utils/middlewares/validators/security-validators');
const LoginService = require('../services/login-service');
const AuthService = require('../services/auth-service');

const logger = require('../logger');
const path = require('path');
const {error} = require("winston");
const _fileName = path.basename(__filename);

class ProductController {
    constructor() {
        router.post('/login',
            SecurityValidatorMiddlewares.validateLoginRequest,
            this._handleLoginRequest
        );
    }

    async _handleLoginRequest(request, response) {
        logger.info(`${_fileName} : Handling login request`);

        if (!request.body.email || !request.body.password) {
            logger.warn(`${_fileName} : Error authenticating user : Error : Missing email or password : Request : ${JSON.stringify(request.body)}`);
            return response.status(StatusCodes.BAD_REQUEST).send({error: error});
        }

        logger.info(`${_fileName} : Getting user by email : Eemail : ${request.body.email}`);
        try {
            const loginStatus = await LoginService.login(request.body);
            const userToken = await AuthService.generateToken(loginStatus);

            logger.info(`${_fileName} : Successfully logged user in : User : ${request.body.email}`);
            response.status(StatusCodes.OK).send({token: userToken});
        } catch (error) {
            logger.error(`${_fileName} : Error authenticating user : Eemail : ${request.body.email} : Error : ${JSON.stringify(error)}`);
            return response.status(error.code).send(error);
        }


    }
}


new ProductController();
module.exports = router;