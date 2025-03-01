// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Récupère le token dans le header Authorization
  
  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé, token manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide ou expiré' });
    }
    // Ajouter les informations de l'utilisateur décodé à la requête
    req.user = decoded;
    next();
  });
};

export default authMiddleware;
