const {portalDbConnection} = require("../database-factory");
const Sequelize = require("sequelize");

const User = require("./user-model");

const Store = portalDbConnection.define('store', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    {
        tableName: 'stores'
    }
);

User.hasMany(Store);

module.exports = Store;