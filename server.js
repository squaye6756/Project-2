//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config();

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


//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World!');
});

//index route
app.get('/coins', (req, res) => {
    Coin.find((err, allCoins) => {
        if (err) {
            console.log(err.message);
        } else {
            res.render(
                'index.ejs',
                {
                    coinList: allCoins
                }
            );
        }
    });
});

//new route
app.get('/coins/new', (req, res) => {
    res.render('new.ejs');
});
//create route
app.post('/coins', (req, res) => {
    req.body.year = parseInt(req.body.year);
    Coin.create(req.body, (err, newCoin) => {
        if (err) {
            console.log(err.message);
        } else {
            res.redirect('/coins');
        }
    });
});

//show route
app.get('/coins/:id', (req, res) => {
    const coinId = req.params.id;
    Coin.findById(coinId, (err, foundCoin) => {
        if (err) {
            console.log(err.message);
        } else {
            // console.log(foundCoin);
            res.render(
                'show.ejs',
                {
                    coin: foundCoin
                }
            );
        }
    });
});

//edit route
app.get('/coins/:id/edit', (req, res) => {
    const coinId = req.params.id;
    Coin.findById(coinId, (err, foundCoin) => {
        if (err) {
            console.log(err.message);
        } else {
            res.render(
                'edit.ejs',
                {
                    coin: foundCoin
                }
            );
        }
    });
});
//update route
app.put('/coins/:id', (req, res) => {
    const coinId = req.params.id;
    req.body.year = parseInt(req.body.year);
    Coin.findByIdAndUpdate(coinId, req.body, (err, editedCoin) => {
        if (err) {
            console.log(err.message);
        } else {
            res.redirect(`/coins/${coinId}`);
        }
    });
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
