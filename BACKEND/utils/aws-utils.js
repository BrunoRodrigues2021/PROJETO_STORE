const config = require('config');
const aws = require('aws-sdk');
const AwsErrors = require('./errors/aws-errors');

const logger = require('../logger');
const path = require('path');
const _fileName = path.basename(__filename);

class AwsUtils {

    constructor() {
        this._secretsClient = new aws.SecretsManager({
            endpoint: config.aws.secrets.endpoint,
            region: config.aws.region
        });
        this._ssmClient = new aws.SSM({
            apiVersion: 'latest',
            region: config.aws.region
        });
    }

    async getParametersFromParameterStore(parametersPath) {
        logger.info(`${_fileName} : Getting parameters from parameter store : ParametersPath : ${parametersPath}`);
        try {
            const params = await this._ssmClient.getParameter({Name: parametersPath, WithDecryption: false}).promise();
            return JSON.parse(params['Parameter']['Value']);
        } catch (error) {
            logger.error(`${_fileName} : Error getting parameters from parameter store : ParametersPath : ${parametersPath} : Error : ${JSON.stringify(error)}`);
            throw AwsErrors.GET_PARAMETERS_FROM_PARAMETER_STORE_ERROR;
        }
    }

    async getSecrets(secretId) {
        logger.info(`${_fileName} : Getting secretId from secrets : SecretId : ${secretId}`);
        try {
            return await this._secretsClient.getSecretValue({SecretId: secretId}).promise();
        } catch (error) {
            logger.error(`${_fileName} : Error getting secretId from secrets : SecretId : ${secretId} : Error : ${error}`);
            throw AwsErrors.GET_SECRETS_ERROR;
        }
    }
}

module.exports = new AwsUtils();