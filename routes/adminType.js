const express = require('express');
const router = express.Router();

const adminTypeController = require('../controllers/adminTypeController');
const authController = require('../controllers/authController');

const initAdminTypeRoute = (app) => {
    router.get('/type-manage', authController.isLoggedAdmin, adminTypeController.getTypeManage);
    return app.use('/', router)
}

module.exports = initAdminTypeRoute;