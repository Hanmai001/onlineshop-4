const express = require('express');
const router = express.Router();

const adminUserController = require('../controllers/adminUserController');
const authController = require('../controllers/authController');

const initAdminUserRoute = (app) => {
    router.get('/users-manage', authController.isLoggedAdmin, adminUserController.getUsersManage);
    router.get('/manage/details-user/:id', authController.isLoggedAdmin, adminUserController.getDetailsUser);

    return app.use('/', router)
}

module.exports = initAdminUserRoute;