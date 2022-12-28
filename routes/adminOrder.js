const express = require('express');
const router = express.Router();

const adminOrderController = require('../controllers/adminOrderController');
const authController = require('../controllers/authController');

const initAdminOrderRoute = (app) => {
    router.get('/oders-manage', authController.isLoggedAdmin, adminOrderController.getOdersManage);
    router.get('/manage/details-order/:id', authController.isLoggedAdmin, adminOrderController.getDetailsOrder);
    return app.use('/', router)
}

module.exports = initAdminOrderRoute;