const express = require('express');
const router = express.Router();
const Coin = require('../models/coins.js');

module.exports = router;

//___________________
// Routes
//___________________

//index route
router.get('/', (req, res) => {
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
router.get('/new', (req, res) => {
    res.render('new.ejs');
});
//create route
router.post('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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
router.get('/:id/edit', (req, res) => {
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
router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const coinId = req.params.id;
    Coin.findByIdAndDelete(coinId, (err, deletedCoin) => {
        if (err) {
            console.log(err.message);
        } else {
            res.redirect('/coins');
        }
    })
});
