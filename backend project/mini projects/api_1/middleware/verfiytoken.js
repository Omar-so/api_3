const jwt = require('jsonwebtoken');
const AppError = require('../apperror/appError');
require('dotenv').config();


const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if (!authHeader) {
        return next(new AppError('Token is required', 401));
    }
    console.log('Auth Header:', authHeader);

    const token = authHeader.split(' ')[1];
    console.log("token  = " , token);
    console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET);

    
    try {
        const currentUser = jwt.verify(token, process.env.JWT_SECRET);
        req.currentUser = currentUser;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return next(new AppError('Token expired', 401));
        }
        return next(new AppError('Invalid token', 401));
    }
    
};

module.exports = verifyToken;
