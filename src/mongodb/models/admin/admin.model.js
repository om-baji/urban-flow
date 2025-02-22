const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    centerID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    centerName: {
        type: String,
        required: true
    }
});

const AdminModel = model('admin', adminSchema);
module.exports = {
    AdminModel
};