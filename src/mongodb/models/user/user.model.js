const { Schema, model } = require('mongoose');
import mongoose from 'mongoose';

const userSchema = new Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    email : {
        type : String,
        required : [true]
    },
    clerk_id : {
        type : String
    },
});

const UserModel = mongoose.models.user || mongoose.model('user', userSchema);
module.exports = {
    UserModel
};