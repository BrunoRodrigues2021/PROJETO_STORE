const {portalDbConnection} = require("../database-factory");
const Sequelize = require("sequelize");

const User = require("./user-model");
const Permission = require("./permisson-model");

const UserPermission = portalDbConnection.define('userPermission', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'user_permissions'
    }
);


User.hasMany(UserPermission);
Permission.hasMany(UserPermission);

module.exports = UserPermission;