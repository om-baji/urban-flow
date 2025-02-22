const { MongoDataSource } = require('apollo-datasource-mongodb');
const { AdminModel } = require('./admin.model.js');

class AdminDataSource extends MongoDataSource {
    async getAdminByCenterIDAndPassword(centerID, password) {
        return this.model.findOne({ centerID, password });
    }

    async createAdmin(centerID, password, lat, lng, centerName) {
        return this.model.create({ centerID, password, lat, lng, centerName });
    }
}

module.exports = {
    name: "AdminDataSource",
    model: AdminModel,
    datasource: AdminDataSource
};