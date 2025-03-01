import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { models } from "../models/index.js";  // ou ton chemin vers les modèles
import { loginSchema } from "../validators/loginValidator.js"; // Si tu utilises Joi

const { User } = models;

// Contrôleur pour la connexion
export const loginUser = async (req, res) => {
  try {
    // Validation avec Joi
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

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

    // Création du token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },  // Ajout du rôle dans le payload
      process.env.SECRET_KEY,  // Utilisation de la clé secrète stockée dans .env
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: "Connexion réussie", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
