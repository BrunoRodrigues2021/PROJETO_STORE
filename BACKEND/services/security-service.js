const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../logger');
const AwsUtils = require('../utils/aws-utils');

const _fileName = module.filename.split("/").pop();

class SecurityService {
    async generateToken(userData) {
        logger.info(`${_fileName} : Generating JWT token : Eemail: ${userData.email}`);
        try {
            const {SecretString: privateKey} = await AwsUtils.getSecrets(config.aws.secrets.secretSignerName);

            const payloadToSign = {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                language: userData.language,
                userIsActive: !!userData.userActive
            };

            const token =  await jwt.sign({userData: payloadToSign}, privateKey,
                {
                    algorithm: config.jwt.algorithm,
                    issuer: config.jwt.issuer,
                    audience: config.jwt.audience,
                    expiresIn: config.jwt.expirationTime
                }
            );
            logger.info(`${_fileName} : JWT token generated successfully : Email: ${userData.email}`);
            return token;
        } catch (error) {
            logger.error(`${_fileName} : Error generating JWT token : Email: ${userData.email} : Error :${error}`);
            return '';
        }
    }

    getToken(request) {
        const {headers} = request;
        return !headers || !headers.authorization || !headers.authorization.startsWith('Bearer ')
            ? ''
            : headers.authorization.replace('Bearer ', '');
    }

    async getParsedToken(token) {
        const {SecretString: publicKey} = await AwsUtils.getSecrets(config.aws.secrets.secretVerifierName);

        return jwt.verify(token, publicKey, {
            algorithm: config.jwt.algorithm,
            issuer: config.jwt.issuer,
            audience: config.jwt.audience,
        });
    }
}

module.exports = new SecurityService();