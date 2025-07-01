import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { generateToken } from '../utils/generateToken.js';
import { setAuthCookie, clearAuthCookie } from '../utils/cookieUtils.js';

// Contrôleur pour la connexion
export const loginUser = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }

  const token = generateToken(user);

  // ⬇️ Pose le cookie avec les options sécurisées
  setAuthCookie(res, token);

  res.status(200).json({ message: "Connexion réussie" });
});

// Contrôleur pour la déconnexion
export const logoutUser = ctrlWrapper(async (req, res) => {
  try {
    // ⬇️ Supprime le cookie proprement
    clearAuthCookie(res);

    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
