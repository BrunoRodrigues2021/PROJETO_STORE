const {portalDbConnection} = require("../database-factory");
const Sequelize = require("sequelize");

const Product = require("./product-model");
const Stock = require("./store-model");


const ProductIO = portalDbConnection.define('productIO', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        amount: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        operationType: {
            type: Sequelize.TINYINT,
            allowNull: false,
            defaultValue: 1
        }
    },
    {
        updatedAt: false,
        tableName: 'products_io'
    }
);


Product.hasMany(ProductIO);
Stock.hasMany(ProductIO);

module.exports = ProductIO;