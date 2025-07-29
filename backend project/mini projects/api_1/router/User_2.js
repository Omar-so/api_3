const express = require('express');
const multer = require('multer');
const userController = require('../Controller/user_2');
const path = require('path');
const router = express.Router();

// Configure multer for file uploads
// const diskStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './upload'); // Save uploaded files to 'images' directory
//     },
//     filename: function (req, file, cb) {
//         const ext = file.mimetype.split('/')[1];
//         const fileName = `user-${Date.now()}.${ext}`;
//         cb(null, fileName);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const imageType = file.mimetype.split('/')[0];
    
//     if (imageType === 'image') {
//         return cb(null, true);
//     } else {
//         return cb(new Error('File must be an image'), false);
//     }
// };

// const upload = multer({ 
//     storage: diskStorage,
//     // fileFilter: fileFilter
// });

const upload = multer({ dest: 'uploads/' });

// Routes
router.post('/register', upload.single('file'), userController.register);
router.post('/login', userController.login);

module.exports = router;
