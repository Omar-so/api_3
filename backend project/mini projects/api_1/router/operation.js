
// user_2 for ordinary user 
// while user for admin

const express = require('express');
const router = express.Router();
const coursescontroller = require('../Controller/coursescontroller');
const VerfiyToken = require('../middleware/verfiy2');
const verifyToken = require('../middleware/verfiy2');

router.route('/')
  .get(VerfiyToken, coursescontroller.getall)
  .post(VerfiyToken,coursescontroller.AddToCart);

router.route('/:CourseName')
  .post(VerfiyToken, coursescontroller.SearchByName)

router.route('/chart')
   .get(verifyToken,coursescontroller.DisplayAllChart)
   .delete(verifyToken,coursescontroller.DeleteChart)

   
module.exports = router;
