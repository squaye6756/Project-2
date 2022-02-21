const express = require('express');
const router = express.Router();
const Coin = require('../models/coins.js');
const User = require('../models/users.js');

module.exports = router;

const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        return next();
    } else {
        res.redirect('/sessions/new');
    }
}

//___________________
// Routes
//___________________

//index route
router.get('/', isLoggedIn, (req, res) => {
    // console.log('index get route');
    Coin.find((err, allCoins) => {
        // console.log('in coins (find)');
        // console.log(req.session.currentUser.coins);
        if (err) {
            console.log(err.message);
        } else {
            res.render(
                'index.ejs',
                {
                    currentUser: req.session.currentUser
                }
            );
        }
    });
});

//new route
router.get('/new', isLoggedIn, (req, res) => {
    res.render(
        'new.ejs',
        {
            currentUser: req.session.currentUser
        }
    );
});
//create route
router.post('/', (req, res) => {
    req.body.year = parseInt(req.body.year);
    const rightNow = new Date();
    const yr = rightNow.getFullYear();
    const mo = rightNow.getMonth() + 1;
    const day = rightNow.getDate();
    const hr = rightNow.getHours();
    const min = rightNow.getMinutes();
    const creationDate = `${mo}-${day}-${yr} @ ${hr}:${min}`;
    req.body.created_at = creationDate;
    User.findById(req.session.currentUser._id, (err, currCollector) => {
        if (err) {
            console.log(err.message);
        } else {
            // console.log('in find');
            // console.log('user found\n',currCollector);
            Coin.create(req.body, (err, newCoin) => {
                // console.log('in create');
                if (err) {
                    console.log(err.message);
                } else {
                    // console.log('user still found\n',currCollector);
                    currCollector.coins.push(newCoin);
                    currCollector.save((err, data) => {
                        // console.log('data', data);
                        req.session.currentUser = data;
                        res.redirect('/coins');
                    });
                }
            });
        }
    });
});

//show route
router.get('/:id', isLoggedIn, (req, res) => {
    // console.log('current user', req.session.currentUser);
    const coinId = req.params.id;
    Coin.findById(coinId, (err, foundCoin) => {
        if (err) {
            console.log(err.message);
        } else {
            // console.log('show route', foundCoin);
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

//delete route
router.delete('/:id', isLoggedIn, (req, res) => {
    const coinId = req.params.id;
    Coin.findByIdAndDelete(coinId, (err, deletedCoin) => {
        if (err) {
            console.log(err.message);
        } else {
            const userId = req.session.currentUser._id;
            User.findById(userId, (err, currCollector) => {
                if (err) {
                    console.log(err.message);
                } else {
                    currCollector.coins.id(coinId).remove();
                    currCollector.save((err, data) => {
                        // console.log('data', data);
                        req.session.currentUser = data;
                        res.redirect('/coins');
                    });
                }
            });
        }
    });
});

router.get('/browse/collections/all', (req, res) => {
    User.find({public:true}, (err, publicUsers) => {
        if (err) {
            console.log(err.message);
        } else {
            res.render(
                'browse.ejs',
                {
                    // currentUser: req.session.currentUser,
                    publicUsers: publicUsers
                }
            );
        }
    });
});

router.get('/browse/collection/one/:id', (req, res) => {
    const collectorId = req.params.id;
    User.findById(collectorId, (err, selectedCollector) => {
        if (err) {
            console.log(err.message);
        } else {
            res.render(
                'collector.ejs',
                {
                    collector: selectedCollector
                }
            )
        }
    })
});
