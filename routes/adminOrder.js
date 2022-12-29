const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const appRoot = require('app-root-path');

const adminOrderController = require('../controllers/adminOrderController');
const authController = require('../controllers/authController');

//Middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + '/public/images');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Ham để check file
const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(null, false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });

const initAdminOrderRoute = (app) => {
    router.get('/oders-manage', authController.isLoggedAdmin, adminOrderController.getOdersManage);
    router.get('/manage/details-order/:id', authController.isLoggedAdmin, adminOrderController.getDetailsOrder);
    router.post('/manage/details-order/:id/update-info', upload.single('update-ava'), adminOrderController.updateInformation);

    return app.use('/', router)
}

module.exports = initAdminOrderRoute;