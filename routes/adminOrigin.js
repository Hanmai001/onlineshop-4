const express = require('express');
const router = express.Router();

const adminOriginController = require('../controllers/adminOriginController');
const authController = require('../controllers/authController');

const initAdminOriginRoute = (app) => {
    router.get('/origin-manage', authController.isLoggedAdmin, adminOriginController.getOriginManage);
    router.get('/manage/details-origin/:id', authController.isLoggedAdmin, adminOriginController.getDetailsOrigin);
    return app.use('/', router)
}

module.exports = initAdminOriginRoute;