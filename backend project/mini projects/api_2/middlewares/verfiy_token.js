const jwt = require('jsonwebtoken');
const custom_error = require('../errors/error');
require('dotenv').config();


const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if (!authHeader) {
        return next(new custom_error(401, 'Token is required'));
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const currentUser = jwt.verify(token, process.env.JWT_SECRET);
        req.currentUser = currentUser;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return next(new custom_error(401,'Token expired'));
        }
        return next(new custom_error(401 ,'Invalid token'));
    }
    
};

module.exports = verifyToken;
