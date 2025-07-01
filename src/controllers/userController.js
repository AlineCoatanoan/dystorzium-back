import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { badRequestResponse } from '../middlewares/errorMiddleware.js';
import { generateToken } from '../utils/generateToken.js';
import { setAuthCookie } from '../utils/cookieUtils.js';
import { successResponse } from '../utils/successUtils.js';

// 🔹 Récupérer tous les utilisateurs
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Récupérer un utilisateur par ID
export const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Créer un utilisateur (avec rôle)
export const createUser = ctrlWrapper(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return badRequestResponse(res, "All fields are required");
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return badRequestResponse(res, "Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
    role,
  });

  const token = generateToken(user);

  setAuthCookie(res, token);

  successResponse(res, "User created successfully", {
    id: user.id,
    email: user.email,
    role: user.role,
  });
});

// 🔹 Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    // Vérifier si l'utilisateur existe
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    // Vérifier que l'utilisateur peut modifier son propre compte ou si c'est un admin
    if (req.user.id !== user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Vous ne pouvez pas modifier un autre compte" });
    }

    // Vérifier que l'utilisateur est un admin pour modifier un rôle
    if (req.user.role !== 'admin' && req.body.role) {
      return res.status(403).json({ message: "Seul un administrateur peut changer le rôle" });
    }

    if (req.body.email && req.body.email !== user.email) {
      const existingUser = await User.findOne({ where: { email: req.body.email } });
      if (existingUser) {
        return res.status(400).json({ message: "Cet e-mail est déjà utilisé" });
      }
    }
    // Hash du mot de passe s'il est fourni
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    // Mise à jour de l'utilisateur
    await user.update(req.body);

    res.status(200).json({ message: "Utilisateur mis à jour avec succès", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Supprimer un utilisateur
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    // Vérifier si l'utilisateur existe
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    // Vérifier que l'utilisateur peut supprimer son propre compte ou si c'est un admin
    if (req.user.id !== user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Vous ne pouvez pas supprimer un autre compte" });
    }

    // Supprimer l'utilisateur
    await user.destroy();

    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};