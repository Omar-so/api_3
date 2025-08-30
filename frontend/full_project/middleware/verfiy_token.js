const jwt = require('jsonwebtoken');
const Custom_Error = require('../utlity/error');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(" ")[1];
  if (!token) {
    return next(new Custom_Error(401, "Access Denied. No token provided."));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return next(new Custom_Error(401, "Invalid or expired token"));
  }
};

module.exports = verifyToken;
