const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    first_name: {
        type: String,
        minlength: 1,
        trim: true
    },
    last_name: {
        type: String,
        minlength: 1,
        trim: true
    }
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;