// utils/verifyToken.js
import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    if (!process.env.JWT_SECRET) {
      return reject(new Error('Clé secrète JWT non définie'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);
      console.log("process.env.JWT_SECRET =", process.env.JWT_SECRET);
      resolve(decoded);
    });
  });
};
