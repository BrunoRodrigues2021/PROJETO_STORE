const database = require('../sequelize/database-factory');
const User = require('../sequelize/models/user-model');

class UserService {
    async getUsers() {}

    async insertUser() {
        const newUser = await User.create({
            name: 'Bruno',
            mail: 'brunorodri2015@gmail.com'
        });

        return newUser;
    }
}

module.exports =  new UserService();
