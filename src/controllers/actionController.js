import { Action } from '../models/actionModel'; // Modèle Action
import { Riddle } from '../models/riddleModel'; // Modèle Riddle

// Créer une action pour une énigme
export const createAction = async (req, res) => {
  try {
    const { riddleId, description } = req.body;
    const riddle = await Riddle.findByPk(riddleId);
    if (!riddle) {
      return res.status(404).json({ message: 'Énigme non trouvée.' });
    }
    const newAction = await Action.create({ riddleId, description });
    res.status(201).json(newAction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'action.' });
  }
};

// Obtenir toutes les actions pour une énigme
export const getActionsForRiddle = async (req, res) => {
  try {
    const actions = await Action.findAll({
      where: { riddleId: req.params.riddleId },
    });
    res.status(200).json(actions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des actions.' });
  }
};

// Obtenir une action par ID
export const getActionById = async (req, res) => {
  try {
    const action = await Action.findByPk(req.params.id);
    if (!action) {
      return res.status(404).json({ message: 'Action non trouvée.' });
    }
    res.status(200).json(action);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'action.' });
  }
};

// Mettre à jour la réponse d'une action
export const updateActionResponse = async (req, res) => {
  try {
    const { actionId, response } = req.body;
    const action = await Action.findByPk(actionId);
    if (!action) {
      return res.status(404).json({ message: 'Action non trouvée.' });
    }

    action.response = response;
    await action.save();

    res.status(200).json({ message: 'Réponse de l\'action mise à jour avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la réponse à l\'action.' });
  }
};
