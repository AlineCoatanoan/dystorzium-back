import { User_Clue } from '../models/userClueModel';
import { User } from '../models/userModel';
import { Clue } from '../models/clueModel';

// Créer une demande d'indice pour un utilisateur
export const createUserClue = async (req, res) => {
  try {
    const { user_id, clue_id } = req.body;

    if (!user_id || !clue_id) {
      return res.status(400).json({ message: 'L\'ID utilisateur et l\'ID de l\'indice sont requis.' });
    }

    const userClue = await User_Clue.create({ user_id, clue_id });

    res.status(201).json(userClue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la demande d\'indice.' });
  }
};

// Récupérer une demande d'indice par ID
export const getUserClueById = async (req, res) => {
  try {
    const { id } = req.params;
    const userClue = await User_Clue.findByPk(id, {
      include: [
        { model: User, attributes: ['id', 'username'] },
        { model: Clue, attributes: ['id', 'description'] },
      ],
    });

    if (!userClue) {
      return res.status(404).json({ message: 'Demande d\'indice non trouvée.' });
    }

    res.status(200).json(userClue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la demande d\'indice.' });
  }
};

// Récupérer toutes les demandes d'indices d'un utilisateur
export const getUserCluesByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const userClues = await User_Clue.findAll({
      where: { user_id },
      include: [{ model: Clue, attributes: ['id', 'description'] }],
    });

    if (!userClues.length) {
      return res.status(404).json({ message: 'Aucune demande d\'indice trouvée pour cet utilisateur.' });
    }

    res.status(200).json(userClues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des demandes d\'indices utilisateur.' });
  }
};

// Supprimer une demande d'indice
export const deleteUserClue = async (req, res) => {
  try {
    const { id } = req.params;

    const userClue = await User_Clue.findByPk(id);
    if (!userClue) {
      return res.status(404).json({ message: 'Demande d\'indice non trouvée.' });
    }

    await userClue.destroy();

    res.status(200).json({ message: 'Demande d\'indice supprimée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la demande d\'indice.' });
  }
};
