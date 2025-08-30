const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  Create_Application,
  Search_Application,
  Delete_Application,
  Get_Paginated_Application
} = require('../controller/application_controller'); // adjust path

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder to save uploaded images
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ dest : 'uploudAppliction' });


// Create a new application (with image)
router.post('/', upload.single('image'), Create_Application);

// Search applications by name
router.get('/search', Search_Application);

// Delete application by ID
router.delete('/', Delete_Application);

// Get paginated applications
router.get('/', Get_Paginated_Application);

module.exports = router;
