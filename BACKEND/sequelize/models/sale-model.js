const {portalDbConnection} = require("../database-factory");
const Sequelize = require("sequelize");

const Store = require("./store-model");

const Sale = portalDbConnection.define('sale', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        salesCode: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    {
        updatedAt: false,
        tableName: 'sales'
    }
);

Store.hasMany(Sale);

module.exports = Sale;