import { Riddle } from '../models/riddleModel.js'; 
import { validateResponse } from '../middlewares/validateResponseMiddleware.js'; 

// Créer une énigme
export const createRiddle = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newRiddle = await Riddle.create({ title, description });
    res.status(201).json(newRiddle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'énigme.' });
  }
};

// Obtenir toutes les énigmes
export const getAllRiddles = async (req, res) => {
  try {
    const riddles = await Riddle.findAll();
    res.status(200).json(riddles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des énigmes.' });
  }
};

// Obtenir une énigme par ID
export const getRiddleById = async (req, res) => {
  try {
    const riddle = await Riddle.findByPk(req.params.id);
    if (!riddle) {
      return res.status(404).json({ message: 'Énigme non trouvée.' });
    }
    res.status(200).json(riddle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'énigme.' });
  }
};

// Mettre à jour une énigme par ID
export const updateRiddle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const riddle = await Riddle.findByPk(id);
    if (!riddle) {
      return res.status(404).json({ message: 'Énigme non trouvée.' });
    }

    // Mettre à jour les informations de l'énigme
    riddle.title = title || riddle.title;
    riddle.description = description || riddle.description;
    
    await riddle.save();

    res.status(200).json(riddle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'énigme.' });
  }
};

// Supprimer une énigme par ID
export const deleteRiddle = async (req, res) => {
  try {
    const { id } = req.params;

    const riddle = await Riddle.findByPk(id);
    if (!riddle) {
      return res.status(404).json({ message: 'Énigme non trouvée.' });
    }

    // Supprimer l'énigme
    await riddle.destroy();

    res.status(200).json({ message: 'L\'énigme a été supprimée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'énigme.' });
  }
};
