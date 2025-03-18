import { Riddle } from '../models/riddleModel.js'; // Modèle de l'énigme
import { Action } from '../models/actionModel.js'; // Modèle de l'action
import { validateResponse } from '../middlewares/validateResponseMiddleware.js'; // Validation Joi

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

// Valider une énigme après la soumission des actions
export const validateRiddleCompletion = async (req, res) => {
  try {
    const { error, value } = validateResponse.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { userId, riddleId, actions } = value;

    // Vérifier si l'utilisateur a rempli toutes les actions
    const completedActions = await Action.findAll({
      where: { riddleId, userId },
    });

    if (completedActions.length !== actions.length) {
      return res.status(400).json({ message: 'Toutes les actions doivent être complétées.' });
    }

    // Marquer l'énigme comme résolue
    const riddle = await Riddle.findByPk(riddleId);
    if (!riddle) {
      return res.status(404).json({ message: 'Énigme non trouvée.' });
    }

    riddle.completed = true;
    await riddle.save();

    res.status(200).json({ message: 'L\'énigme a été résolue avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la validation de l\'énigme.' });
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
