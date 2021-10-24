const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema (
    {
        name: String,
        headImg: String,
        tailImg: String,
        year: Number,
        desc: String
    },
    {timestamps: true}
);

//create database 'coins' in mongo
const Coin = mongoose.model('coins', coinSchema);

module.exports = Coin;
