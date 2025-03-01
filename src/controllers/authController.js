import bcrypt from 'bcrypt';
import { User } from '../models'; // Assure-toi d'importer ton modèle User
import { validateLogin } from '../middlewares/validate'; // Import du schéma de validation
import { ctrlWrapper } from '../utils/ctrlWrapper'; // Si tu utilises un wrapper pour gérer les erreurs
import { generateToken } from '../../utils/generateToken'; // Import de la fonction generateToken

// Contrôleur pour la connexion
export const loginUser = ctrlWrapper(async (req, res) => {
  // Validation avec Joi
  const { error } = validateLogin.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  // Recherche de l'utilisateur dans la base de données
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }

  // Vérification du mot de passe
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }

  // Vérification du rôle (si admin)
  if (user.role !== 'admin') {
    return res.status(403).json({ message: "Accès réservé aux administrateurs" });
  }

  // Utilisation de la fonction generateToken pour créer le token
  const token = generateToken(user);

  res.status(200).json({ message: "Connexion réussie", token });
});
