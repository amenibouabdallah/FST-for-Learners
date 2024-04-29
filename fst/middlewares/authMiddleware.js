const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
dotenv.config();

const secret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });

    req.user = decoded.user;
    next();
  });
};

module.exports = { verifyToken };
