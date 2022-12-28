const express = require('express');
const router = express.Router();

const adminTypeController = require('../controllers/adminTypeController');
const authController = require('../controllers/authController');

const initAdminTypeRoute = (app) => {
    router.get('/type-manage', authController.isLoggedAdmin, adminTypeController.getTypeManage);
    router.get('/manage/details-type/:id', authController.isLoggedAdmin, adminTypeController.getDetailsType);
    return app.use('/', router)
}

module.exports = initAdminTypeRoute;