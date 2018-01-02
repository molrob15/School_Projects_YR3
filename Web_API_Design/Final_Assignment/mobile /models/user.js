const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema Constructor for new users
const userSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

const User = mongoose.model('user', userSchema);


module.exports = User;