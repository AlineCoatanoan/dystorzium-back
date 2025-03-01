import { User_Riddle } from '../models/userRiddleModel';
import { User } from '../models/userModel';
import { Riddle } from '../models/riddleModel';

// Créer une participation à une énigme
export const createUserRiddle = async (req, res) => {
  try {
    const { user_id, riddle_id, state } = req.body;

    if (!user_id || !riddle_id || !state) {
      return res.status(400).json({ message: 'L\'ID utilisateur, l\'ID de l\'énigme et l\'état sont requis.' });
    }

    const userRiddle = await User_Riddle.create({ user_id, riddle_id, state });

    res.status(201).json(userRiddle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la participation à l\'énigme.' });
  }
};

// Récupérer une participation à une énigme par ID
export const getUserRiddleById = async (req, res) => {
  try {
    const { id } = req.params;
    const userRiddle = await User_Riddle.findByPk(id, {
      include: [
        { model: User, attributes: ['id', 'username'] },
        { model: Riddle, attributes: ['id', 'title', 'description'] },
      ],
    });

    if (!userRiddle) {
      return res.status(404).json({ message: 'Participation à l\'énigme non trouvée.' });
    }

    res.status(200).json(userRiddle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la participation à l\'énigme.' });
  }
};

// Récupérer toutes les participations d'un utilisateur
export const getUserRiddlesByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const userRiddles = await User_Riddle.findAll({
      where: { user_id },
      include: [{ model: Riddle, attributes: ['id', 'title', 'description'] }],
    });

    if (!userRiddles.length) {
      return res.status(404).json({ message: 'Aucune participation trouvée pour cet utilisateur.' });
    }

    res.status(200).json(userRiddles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des participations d\'utilisateur.' });
  }
};

// Mettre à jour une participation à une énigme
export const updateUserRiddle = async (req, res) => {
  try {
    const { id } = req.params;
    const { state, date_completed } = req.body;

    const userRiddle = await User_Riddle.findByPk(id);
    if (!userRiddle) {
      return res.status(404).json({ message: 'Participation à l\'énigme non trouvée.' });
    }

    userRiddle.state = state || userRiddle.state;
    userRiddle.date_completed = date_completed || userRiddle.date_completed;

    await userRiddle.save();

    res.status(200).json(userRiddle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la participation à l\'énigme.' });
  }
};

// Supprimer une participation à une énigme
export const deleteUserRiddle = async (req, res) => {
  try {
    const { id } = req.params;

    const userRiddle = await User_Riddle.findByPk(id);
    if (!userRiddle) {
      return res.status(404).json({ message: 'Participation à l\'énigme non trouvée.' });
    }

    await userRiddle.destroy();

    res.status(200).json({ message: 'Participation à l\'énigme supprimée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la participation à l\'énigme.' });
  }
};
