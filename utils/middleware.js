import jwt from 'jsonwebtoken';
import config from '../config/env.js';

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'Unauthorized' });

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token is invalid' });
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  });
};

export const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'Unauthorized' });

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token is invalid' });
    if (decoded.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  });
};