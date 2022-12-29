const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

//Khoi tao web router
const initOrderRoute = (app) => {
    router.use((req, res, next) => {
        res.locals.flashMessages = req.flash();
        next();
    });
    router.get('/list-orders-status/:id', authController.isLoggedCustomer, orderController.getListOrderStatusPage);
    router.get('/list-orders-status/:id/filter', authController.isLoggedCustomer, orderController.getListFilterOrderStatusPage);
    router.get('/list-orders-status/:id/order-detail/:idOrder', authController.isLoggedCustomer, orderController.getOrderDetailPage);

    return app.use('/', router);
}

module.exports = initOrderRoute;

