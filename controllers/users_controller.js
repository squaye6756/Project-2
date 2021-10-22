const express = require('express');
const users = express.Router();
const bcrypt = require('bcrypt');
//connects with User model
const User = require('../models/users.js');

users.get('/new', (req, res) => {
    res.render('users/new.ejs');
});
users.post('/sign_up', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    req.body.public = req.body.public === 'on';
    req.body.coins = [];
    User.create(req.body, (err, newUser) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log(newUser);
            res.redirect('/coins');
        }
    });
});

module.exports = users;
