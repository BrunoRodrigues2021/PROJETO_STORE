const {portalDbConnection} = require("../database-factory");
const Sequelize = require("sequelize");

const Permission = portalDbConnection.define('permission', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        createdAt: false,
        updatedAt: false,
        tableName: 'permissions'
    }
);

module.exports = Permission;