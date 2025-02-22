const { MongoDataSource } = require('apollo-datasource-mongodb');
const { UserModel } = require('./user.model.js');

class UserDataSource extends MongoDataSource {
    async getUserById(id) {
        return this.model.findOne({ id });
    }

    async createUser(id, name, email) {
        return this.model.create({ id, name, email });
    }
}

module.exports = {
    name: "UserDataSource",
    model: UserModel,
    datasource: UserDataSource
};