const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

//Khoi tao web router
const initProductRoute = (app) => {
    router.use((req, res, next) => {
        res.locals.flashMessages = req.flash();
        next();
    });
    router.get('/products/details/:id', authController.isLoggedCustomer, userController.getDetailProductPage);
   
    return app.use('/', router);
}

module.exports = initProductRoute;

