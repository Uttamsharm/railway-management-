const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
    req.user = decoded; // Attach decoded payload to `req.user`
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to check user roles
const authorizeRole = (role) => {
  return async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id); // Retrieve user details from the database
      if (!user || user.role !== role) {
        return res.status(403).json({ message: 'Access Denied: Unauthorized role' });
      }
      next();
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};

module.exports = { authenticateToken, authorizeRole };
