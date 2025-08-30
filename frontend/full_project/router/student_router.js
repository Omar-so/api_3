const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { 
  Get_Paginated_Students,
  Create_Student,
  Search_Student,
  Delete_Student,
  Updated_Student,
  Get_All_Students_CSV,
  count_graph
} = require('../controller/student_controller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ dest: 'uploadsStudent/' })


router.get('/', Get_Paginated_Students);

router.get('/export/csv', Get_All_Students_CSV);

router.post('/', upload.single('image'), Create_Student); 

router.get('/search', Search_Student);

router.put('/:id', upload.single('image'), Updated_Student);

router.delete('/:id', Delete_Student);

router.get('/count_graph' , count_graph )

module.exports = router;
