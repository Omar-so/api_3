const express = require('express');
const router = express.Router();
const coursescontroller = require('../Controller/coursescontroller');
const VerfiyToken = require('../middleware/verfiytoken');
const multer = require('multer');

const upload = multer({ dest: 'uploadsCourse/' });

router.route('/')
  .get(VerfiyToken, coursescontroller.getall)
  .post(VerfiyToken,upload.single('file') ,coursescontroller.addcourse);

router.route('/:courseId')
  .get(VerfiyToken, coursescontroller.getCourse)
  .delete(VerfiyToken, coursescontroller.deletecourses);

module.exports = router;
