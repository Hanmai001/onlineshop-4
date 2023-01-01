const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const appRoot = require('app-root-path');

const adminOriginController = require('../controllers/adminOriginController');
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

const initAdminOriginRoute = (app) => {
    router.get('/origin-manage', authController.isLoggedAdmin, adminOriginController.getOriginManage);
    router.get('/manage/details-origin/:id', authController.isLoggedAdmin, adminOriginController.getDetailsOrigin);
    router.post('/manage/details-origin/:id/update-info', upload.single('update-ava'), adminOriginController.updateInformation);
    router.get('/admin-add-origin', authController.isLoggedAdmin, adminOriginController.getAddOrigin);
    router.get('/origin-manage/:id/delete-origin', authController.isLoggedAdmin, adminOriginController.deleteInformation);
    router.post('/admin-add-origin/add-origin', authController.isLoggedAdmin, adminOriginController.addInformation);

    return app.use('/', router)
}

module.exports = initAdminOriginRoute;