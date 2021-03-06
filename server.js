//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const db = mongoose.connection;
require('dotenv').config();
const session = require('express-session');

const Coin = require('./models/coins.js');
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
);

// localhost:3000
app.get('/' , (req, res) => {
  res.redirect('/home');
});
app.get('/home', (req, res) => {
    res.render('home.ejs');
});

//connections to controllers in controllers folder
//connects with coins_controller.js
const coinsController = require('./controllers/coins_controller.js');
app.use('/coins', coinsController);
//connects with users_controller.js
const usersController = require('./controllers/users_controller.js');
app.use('/users', usersController);
//connects with sessions_controller.js
const sessionsController = require('./controllers/sessions_controller.js');
app.use('/sessions', sessionsController);

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
