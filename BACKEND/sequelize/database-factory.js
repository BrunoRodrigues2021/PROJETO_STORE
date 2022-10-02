const config = require('config');
const Sequelize = require('sequelize');
const AwsUtils = require('../utils/aws-utils');

class DatabaseFactory {

    constructor() {
        this.getPortalDbConfig = this.getPortalDbConfig.bind(this);

        this._portalDbConfig = null;
        this._portalDbConnection = new Sequelize({
            dialect: 'mysql',
            hooks: {
                beforeConnect: (async (configInfo) => {
                    await this.getPortalDbConfig();
                    configInfo.host = this._portalDbConfig.host;
                    configInfo.username = this._portalDbConfig.user;
                    configInfo.password = this._portalDbConfig.password;
                    configInfo.port = this._portalDbConfig.port;
                    configInfo.database = this._portalDbConfig.database;
                })
            }
        });
    }

    get portalDbConnection() {
        return this._portalDbConnection;
    }

    async getPortalDbConfig() {
        if (!this._portalDbConfig) {
            this._portalDbConfig = await AwsUtils
                .getParametersFromParameterStore(config.aws.parameterStore.storeDb.parameters);
        }

        return this._portalDbConfig;
    }
}

module.exports = new DatabaseFactory();