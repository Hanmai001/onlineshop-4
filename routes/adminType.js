const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const appRoot = require('app-root-path');

const adminTypeController = require('../controllers/adminTypeController');
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

const initAdminTypeRoute = (app) => {
    router.get('/type-manage', authController.isLoggedAdmin, adminTypeController.getTypeManage);
    router.get('/manage/details-type/:id', authController.isLoggedAdmin, adminTypeController.getDetailsType);
    router.post('/manage/details-type/:id/update-info', upload.single('update-ava'), adminTypeController.updateInformation);

    return app.use('/', router)
}

module.exports = initAdminTypeRoute;