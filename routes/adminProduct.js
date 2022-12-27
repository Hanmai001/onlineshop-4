const express = require('express');
const router = express.Router();

const adminProductController = require('../controllers/adminProductController');
const authController = require('../controllers/authController');

const initAdminProductRoute = (app) => {
    router.get('/product-manage', authController.isLoggedAdmin, adminProductController.getProductManage);
    router.get('/manage/details-product/:id', authController.isLoggedAdmin, adminProductController.getDetailsProduct);

    return app.use('/', router)
}

module.exports = initAdminProductRoute;