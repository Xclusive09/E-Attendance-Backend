import jwt from 'jsonwebtoken';
import config from './config/env.js';

const token = jwt.sign({ userId: 1, userName: 'johndoe' }, config.jwtSecret, { expiresIn: '1h' });
console.log(token);