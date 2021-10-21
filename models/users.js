const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {type:String, unique:true, required:true},
        password: String,
        public: {type:Boolean, required:true}
    }
);

//create database collection 'users'
const User = mongoose.model('users', userSchema);
module.exports = User;
