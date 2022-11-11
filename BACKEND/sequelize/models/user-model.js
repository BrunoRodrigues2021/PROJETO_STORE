const {portalDbConnection} = require("../database-factory");
const Sequelize = require("sequelize");

const User = portalDbConnection.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },
        language: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userActive: {
            type: Sequelize.TINYINT,
            allowNull: false,
            defaultValue: 1
        }
    },
    {
        tableName: 'users'
    }
);

module.exports = User;