import { Clue } from '../models/clueModel'; // Modèle Clue

// Créer un nouvel indice
export const createClue = async (req, res) => {
  try {
    const { riddleId, hint, difficulty } = req.body;

    if (!riddleId || !hint) {
      return res.status(400).json({ message: 'L\'ID de l\'énigme et l\'indice sont requis.' });
    }

    const clue = await Clue.create({ riddleId, hint, difficulty });

    res.status(201).json(clue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'indice.' });
  }
};

// Récupérer un indice par ID
export const getClueById = async (req, res) => {
  try {
    const { id } = req.params;
    const clue = await Clue.findByPk(id);

    if (!clue) {
      return res.status(404).json({ message: 'Indice non trouvé.' });
    }

    res.status(200).json(clue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'indice.' });
  }
};

// Récupérer tous les indices d'une énigme
export const getCluesByRiddle = async (req, res) => {
  try {
    const { riddleId } = req.params;
    const clues = await Clue.findAll({ where: { riddleId } });

    if (!clues.length) {
      return res.status(404).json({ message: 'Aucun indice trouvé pour cette énigme.' });
    }

    res.status(200).json(clues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des indices.' });
  }
};

// Mettre à jour un indice
export const updateClue = async (req, res) => {
  try {
    const { id } = req.params;
    const { hint, difficulty } = req.body;

    const clue = await Clue.findByPk(id);
    if (!clue) {
      return res.status(404).json({ message: 'Indice non trouvé.' });
    }

    // Mise à jour des champs si fournis
    clue.hint = hint || clue.hint;
    clue.difficulty = difficulty || clue.difficulty;

    await clue.save();

    res.status(200).json(clue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'indice.' });
  }
};

// Supprimer un indice
export const deleteClue = async (req, res) => {
  try {
    const { id } = req.params;

    const clue = await Clue.findByPk(id);
    if (!clue) {
      return res.status(404).json({ message: 'Indice non trouvé.' });
    }

    await clue.destroy();

    res.status(200).json({ message: 'Indice supprimé avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'indice.' });
  }
};
