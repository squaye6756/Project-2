const express = require('express');
const sessions = express.Router();
const bcrypt = require('bcrypt');
//connects with User model
const User = require('../models/users.js');

sessions.get('/new', (req, res) => {
    res.render(
        'sessions/new.ejs',
        {
            currentUser: req.session.currentUser
        }
    );
});
sessions.post('/logging_in', (req, res) => {
    const username = req.body.username;
    User.findOne({username: username}, (err, foundUser) => {
        if (err) {
            console.log(err.message);
        } else if (!foundUser) {
            res.send("<a href='/'>Sorry, there is no user found by that name</a>");
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                // console.log(req.session.currentUser);
                res.redirect('/coins');
            } else {
                res.send("<a href='/'>Password doesn't match</a>");
            }
        }
    });
});

sessions.delete('/logging_out', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/coins');
    });
})

module.exports = sessions;
