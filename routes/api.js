const express = require('express');
const reviewController = require('../controllers/api/reviewController');
const authController = require('../controllers/authController');
const authApiController = require('../controllers/api/authController');

const router = express.Router();
const passport = require('../passport');

const initApiRoute = (app) => {
    router.use((req, res, next) => {
        res.locals.flashMessages = req.flash();
        next();
    });
    router.post('/register', authController.handleRegister, passport.authenticate("local",
        {
            failureRedirect: "/",
        }), (req, res) => {
            if (req.user.ADMIN == '1') {
                res.redirect('/static');
            }
            else
                res.redirect('/');
        });

    router.post('/login', passport.authenticate("local",
        {
            failureRedirect: "/",
        }), (req, res) => {
            if (req.user.ADMIN == '1') {
                res.redirect('/static');
            }
            else
                res.redirect('/');
        });
    router.get('/logout', authController.logout);
    router.get('/api/list-review/:id/', reviewController.getListReview);
    router.get('/api/verify-username/:username', authApiController.verifyUsername);
    router.get('/api/verify-email/:email', authApiController.verifyEmail);

    return app.use('/', router);
}

module.exports = initApiRoute;