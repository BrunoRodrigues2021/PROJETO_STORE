const SecurityService = require('../../services/security-service');
const SecurityErrors = require('../errors/security-errors');
const logger = require('../../logger');

const _fileName = module.filename.split("/").pop();

class SecurityMiddlewares {

    static async authenticateRequest(request, response, next, expectedPermissions = [],
                                     shouldTokenIncludeAllExpectedPermissions = true) {
        const token = SecurityService.getToken(request);

        logger.info(`${_fileName} : Authenticating request`);

        if (!token) {
            logger.warn(`${_fileName} : Error authenticating request : Error : Token not provided`);
            return response.status(SecurityErrors.UNAUTHORIZED.code).send({
                error: SecurityErrors.UNAUTHORIZED
            });
        }

        let parsedToken;

        try {
            parsedToken = await SecurityService.getParsedToken(token);
        } catch (error) {
            logger.error(`${_fileName} : Error authenticating request : Error : ${error}`);
            return response.status(SecurityErrors.INTERNAL_SERVER_ERROR.code).send({
                error: SecurityErrors.INTERNAL_SERVER_ERROR
            });
        }

        if (!parsedToken) {
            logger.warn(`${_fileName} : Error authenticating request : Error : Invalid token`);
            return response.status(SecurityErrors.UNAUTHORIZED.code).send({
                error: SecurityErrors.UNAUTHORIZED
            });
        }

        if (expectedPermissions.length) {
            let isForbidden = !parsedToken.userData
                || !parsedToken.userData.permissions
                || !parsedToken.userData.permissions.length;

            if (!isForbidden) {
                isForbidden = shouldTokenIncludeAllExpectedPermissions
                    ? !expectedPermissions.every(permission => parsedToken.userData.permissions.includes(permission))
                    : !expectedPermissions.some(permission => parsedToken.userData.permissions.includes(permission));
            }

            if (isForbidden) {
                logger.warn(`${_fileName} : Error authenticating request : TokenPermissions : ${parsedToken.userData.permissions} : ExpectedPermissions : ${expectedPermissions} : ShouldTokenIncludeAllExpectedPermissions : ${shouldTokenIncludeAllExpectedPermissions} : Error : Invalid Permissions`);
                return response.status(SecurityErrors.FORBIDDEN.code).send({
                    error: SecurityErrors.FORBIDDEN
                });
            }
        }

        request.locals = {
            userId: parsedToken.userData.id
        };

        logger.info(`${_fileName} : Successfully authenticated request`);
        next();
    }
}

module.exports = SecurityMiddlewares;
