import QRCode from 'qrcode';
import jwt from 'jsonwebtoken';
import config from '../config/env.js';

export const generateQRCode = async (req, res) => {
  try {
    const token = jwt.sign({ userName: req.userName }, config.jwtSecret, { expiresIn: '1h' });
    const url = `${config.frontendUrl}/attendance/mark?token=${token}`;
    const qrCodeDataURL = await QRCode.toDataURL(url);
    res.status(200).json({ qrCodeDataURL });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};