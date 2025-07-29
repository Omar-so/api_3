const user = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../cloudinary/cloudinary');
const path = require('path');
const fs = require('fs');

// Register Function
const register = async (req, res) => {
  try {
    const { username, email, password } = JSON.parse(req.body.body);
    console.log("###########################################");
    
    console.log('Body:', req.body.body);  // Check body fields
    console.log('File:', req.file);  // Check uploaded file data

    
    console.log("###########################################");


if (!username || !email || !password) {   
  return res.status(400).json({ message: 'All fields are required' });
} 


    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Handle file upload using Cloudinary (Optional)
    let url = null;
    if (req.file) {
        url = await cloudinary.uploadFile(path.join(__dirname, `../uploads/${req.file.filename}`));
    }
    console.log('###########################');
     console.log(url.secure_url);
    console.log('###########################');

    
    // Create user
    const newUser = await user.create({
      name: username,
      email: email,
      password: hashedPassword,
      photo: url ? url.secure_url : null
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login Function
const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const data = await user.findOne({ where: { name: username, email: email } });

    if (!data) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, data.password);

    if (isPasswordValid) {
      const token = jwt.sign({ username, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };
