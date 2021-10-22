const mongoose = require('mongoose');
// //connects with Coin model
// const Coin = require('./coins.js');

const userSchema = new mongoose.Schema(
    {
        username: {type:String, unique:true, required:true},
        password: String,
        public: {type:Boolean, required:true},
        coins: []
    }
);

//create database collection 'users'
const User = mongoose.model('users', userSchema);
module.exports = User;
