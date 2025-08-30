const express = require('express');
const router = express.Router();

const { signup, signin } = require('../controller/admin_controller'); // adjust path

// Sign Up
// POST /admin/signup
router.post('/signup', signup);

// Sign In
// POST /admin/signin
router.post('/signin', signin);

module.exports = router;
