const express = require('express')
const { get_all, quotes_script } = require('../controllers/quotes_service')
const verifyToken = require('../middlewares/verfiy_token')
const router = express.Router()

router.route('/').get(verifyToken , get_all) // Make pagination Take Quray 
router.route('/quotes_script').post(quotes_script)

module.exports = router
