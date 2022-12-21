const express = require('express');
const reviewController = require('../controllers/api/reviewController');
const router = express.Router();

const initApiRoute = (app) => {
    router.get('/api/list-review/:id/', reviewController.getListReview);

    return app.use('/', router);
}

module.exports = initApiRoute;