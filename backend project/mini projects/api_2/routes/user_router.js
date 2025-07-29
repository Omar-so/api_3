const express = require('express');
const router = express.Router();
const { signin, signup, Like } = require('../controllers/user_service'); // Adjust the path if needed
const verifyToken = require('../middlewares/verfiy_token');

router.route('/SignIn_Jwt').post(signin);
router.route('/SignUp_Jwt').post(signup);
router.route('/Like').post( verifyToken , Like)

module.exports = router;
