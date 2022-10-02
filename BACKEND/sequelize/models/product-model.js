const {portalDbConnection} = require("../database-factory");
const Sequelize = require("sequelize");

const User = require("./user-model");

const Product = portalDbConnection.define('product', {
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
        tableName: 'products'
    }
);


User.hasMany(Product);

module.exports = Product;