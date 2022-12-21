const express = require('express');
const router = express.Router();

const authController = require('../controllers/api/authController');

const initAuthRoute = (app) => {
    router.get('/api/verify-username/:username', authController.verifyUsername);
    router.get('/api/verify-email/:email', authController.verifyEmail);

    return app.use('/', router);
}

module.exports = initAuthRoute;