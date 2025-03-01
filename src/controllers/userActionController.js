import { Op } from 'sequelize';
import { User_Action } from '../models/userActionModel';
import { User } from '../models/userModel';
import { Action } from '../models/actionModel';

// Créer une action utilisateur
export const createUserAction = async (req, res) => {
  try {
    const { user_id, action_id, status, response_submitted } = req.body;

    if (!user_id || !action_id || !status) {
      return res.status(400).json({ message: 'L\'ID utilisateur, l\'ID action et le statut sont requis.' });
    }

    const userAction = await User_Action.create({ user_id, action_id, status, response_submitted });

    res.status(201).json(userAction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'action utilisateur.' });
  }
};

// Récupérer une action utilisateur par ID
export const getUserActionById = async (req, res) => {
  try {
    const { id } = req.params;
    const userAction = await User_Action.findByPk(id, {
      include: [
        { model: User, attributes: ['id', 'username'] },
        { model: Action, attributes: ['id', 'name', 'description'] },
      ],
    });

    if (!userAction) {
      return res.status(404).json({ message: 'Action utilisateur non trouvée.' });
    }

    res.status(200).json(userAction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'action utilisateur.' });
  }
};

// Récupérer toutes les actions d'un utilisateur
export const getUserActionsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const userActions = await User_Action.findAll({
      where: { user_id },
      include: [{ model: Action, attributes: ['id', 'name', 'description'] }],
    });

    if (!userActions.length) {
      return res.status(404).json({ message: 'Aucune action trouvée pour cet utilisateur.' });
    }

    res.status(200).json(userActions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des actions utilisateur.' });
  }
};

// Mettre à jour une action utilisateur
export const updateUserAction = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response_submitted } = req.body;

    const userAction = await User_Action.findByPk(id);
    if (!userAction) {
      return res.status(404).json({ message: 'Action utilisateur non trouvée.' });
    }

    userAction.status = status || userAction.status;
    userAction.response_submitted = response_submitted || userAction.response_submitted;

    await userAction.save();

    // Vérifier si toutes les actions de l'utilisateur sont terminées
    const remainingActions = await User_Action.count({
      where: {
        user_id: userAction.user_id,
        status: { [Op.ne]: 'completed' },
      },
    });

    if (remainingActions === 0) {
      // Toutes les actions sont terminées => enregistrer la date de validation
      await User_Action.update(
        { date_validation: new Date() },
        { where: { user_id: userAction.user_id } }
      );
    }

    res.status(200).json(userAction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'action utilisateur.' });
  }
};

// Supprimer une action utilisateur
export const deleteUserAction = async (req, res) => {
  try {
    const { id } = req.params;

    const userAction = await User_Action.findByPk(id);
    if (!userAction) {
      return res.status(404).json({ message: 'Action utilisateur non trouvée.' });
    }

    await userAction.destroy();

    res.status(200).json({ message: 'Action utilisateur supprimée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'action utilisateur.' });
  }
};
