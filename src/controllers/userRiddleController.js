import { User_Riddle } from '../models/userRiddleModel';
import { User } from '../models/userModel';
import { Riddle } from '../models/riddleModel';


// Créer une participation à une énigme
export const createUserRiddle = async (req, res) => {
  try {
    const { user_id, riddle_id } = req.body;

    if (!user_id || !riddle_id) {
      return res.status(400).json({ message: 'L\'ID utilisateur et l\'ID de l\'énigme sont requis.' });
    }

    // Créer une participation avec l'état "en cours"
    const userRiddle = await User_Riddle.create({ 
      user_id, 
      riddle_id, 
      state: 'in_progress'  // État initial, "en cours"
    });

    res.status(201).json(userRiddle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la participation à l\'énigme.' });
  }
};

// Valider la réponse d'une énigme
export const validateRiddleAnswer = async (req, res) => {
  try {
    const { user_id, riddle_id, response_submitted } = req.body;

    if (!user_id || !riddle_id || !response_submitted) {
      return res.status(400).json({ message: 'L\'ID utilisateur, l\'ID de l\'énigme et la réponse sont requis.' });
    }

    // Trouver la participation de l'utilisateur à l'énigme
    const userRiddle = await User_Riddle.findOne({ where: { user_id, riddle_id } });

    if (!userRiddle) {
      return res.status(404).json({ message: 'Participation à l\'énigme non trouvée.' });
    }

    // Récupérer l'énigme pour vérifier la réponse
    const riddle = await Riddle.findByPk(riddle_id);

    if (!riddle) {
      return res.status(404).json({ message: 'Énigme non trouvée.' });
    }

    // Vérifier si la réponse est correcte
    if (response_submitted.toLowerCase() === riddle.correct_answer.toLowerCase()) {
      // Réponse correcte, mettre l'état à "complété"
      userRiddle.state = 'completed';
      userRiddle.date_completed = new Date();  // Enregistrer la date de complétion
    } else {
      // Réponse incorrecte, mettre l'état à "abandonné" ou un autre état
      userRiddle.state = 'abandoned';
    }

    // Sauvegarder les modifications
    await userRiddle.save();

    res.status(200).json({ message: userRiddle.state === 'completed' ? 'Réponse correcte, énigme terminée.' : 'Réponse incorrecte, énigme abandonnée.', userRiddle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la validation de la réponse à l\'énigme.' });
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




