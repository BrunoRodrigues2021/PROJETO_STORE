const database = require('../sequelize/database-factory');
const User = require('../sequelize/models/user-model');

class UserService {
    async getUsers() {}

    async insertUser() {
        const newUser = await User.create({
            name: 'Bruno',
            email: 'brunorodri2015@gemail.com'
        });

        return newUser;
    }

    async getUserByParam(param, value) {
        return await User.findOne({
            attributes: ['id', 'name', 'email'],
            where: {[param]: value}
        })
    }
}

module.exports =  new UserService();
