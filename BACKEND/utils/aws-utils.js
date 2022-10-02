const config = require('config');
const aws = require('aws-sdk');
const AwsErrors = require('./errors/aws-errors');

const logger = require('../logger');
const path = require('path');
const _fileName = path.basename(__filename);

class AwsUtils {

    constructor() {
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
}

module.exports = new AwsUtils();