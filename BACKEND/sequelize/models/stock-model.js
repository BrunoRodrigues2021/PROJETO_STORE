const {portalDbConnection} = require("../database-factory");
const Sequelize = require("sequelize");

const Store = require("./store-model");
const Product = require("./product-model");

const Stock = portalDbConnection.define('stock', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        amount: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        minimumAmount: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        unitPrice: {
            type: Sequelize.DECIMAL(8,2),
            allowNull: false,
            defaultValue: 0.00
        }
    },
    {
        tableName: 'stock'
    }
);


Store.hasMany(Stock);
Product.hasMany(Stock);

module.exports = Stock;