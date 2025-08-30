const Admin = require('../model/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Custom_Error = require('../utilty/Error');

// Sign Up
const signup = async (req, res, next) => {
  try {
    const { name, email, password, age } = req.body;
    if (!name || !email || !password) {
      return next(new Custom_Error(400, "Name, email, and password are required"));
    }
    await Admin.createAdmin({ name, email, password });
    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    next(error);
  }
};

// Sign In
const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new Custom_Error(400, "Email and password are required"));

    const admin = await Admin.getByEmail(email);
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return next(new Custom_Error(401, "Invalid credentials"));

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      sameSite: 'strict',
      maxAge: 3600000 * 2// 1 hour
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin };
