import { User } from '../models';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token';
import { validateRegister } from '../utils/validate'; // Assure-toi d'importer la fonction de validation depuis ton fichier `validate.js`

// 🔹 Récupérer tous les utilisateurs
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } }); // Exclure les mots de passe
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
export const createUser = async (req, res) => {
  try {
    // Validation des données avec Joi (via le fichier `validate.js`)
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // Vérifier que l'utilisateur est un admin pour créer un admin
    if (req.user.role !== 'admin' && req.body.role === 'admin') {
      return res.status(403).json({ message: "Seul un administrateur peut créer un autre administrateur" });
    }

    // Vérification de l'existence de l'utilisateur avec cet email
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) return res.status(400).json({ message: "Cet email est déjà utilisé" });

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    // Création de l'utilisateur
    const user = await User.create({ 
      ...req.body, 
      password: hashedPassword 
    });

    // Générer un token JWT pour l'utilisateur
    const token = generateToken(user);

    // On ne renvoie pas le mot de passe dans la réponse
    const { password, ...userData } = user.toJSON();

    // Répondre avec les données utilisateur et le token
    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: userData,
      token, // Envoi du token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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