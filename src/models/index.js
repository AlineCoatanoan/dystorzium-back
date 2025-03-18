// src/models/index.js

import { sequelize } from '../config/dbclient.js'; // Importer la connexion à la BDD
import { User } from './userModel.js';
import { Action } from './actionModel.js';
import { User_Action } from './userActionModel.js';
import { Riddle } from './riddleModel.js';
import { Clue } from './clueModel.js';
import { User_Clue } from './userClueModel.js';
import { User_Riddle } from './userRiddleModel.js';

// Associer les modèles entre eux
User.hasMany(Action, { foreignKey: 'user_id' });
Action.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(User_Action, { foreignKey: 'user_id' });
Action.hasMany(User_Action, { foreignKey: 'action_id' });
User_Action.belongsTo(User, { foreignKey: 'user_id' });
User_Action.belongsTo(Action, { foreignKey: 'action_id' });

Riddle.hasMany(Action, { foreignKey: 'riddle_id' });
Action.belongsTo(Riddle, { foreignKey: 'riddle_id' });

User.hasMany(User_Riddle, { foreignKey: 'user_id' });
Riddle.hasMany(User_Riddle, { foreignKey: 'riddle_id' });
User_Riddle.belongsTo(User, { foreignKey: 'user_id' });
User_Riddle.belongsTo(Riddle, { foreignKey: 'riddle_id' });

Riddle.hasMany(Clue, { foreignKey: 'riddle_id' });
Clue.belongsTo(Riddle, { foreignKey: 'riddle_id' });

User.hasMany(User_Clue, { foreignKey: 'user_id' });
Clue.hasMany(User_Clue, { foreignKey: 'clue_id' });
User_Clue.belongsTo(User, { foreignKey: 'user_id' });
User_Clue.belongsTo(Clue, { foreignKey: 'clue_id' });

// 🔄 Synchroniser la base de données
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Utilise { alter: true } pour éviter de perdre des données
    console.log('✅ Base de données synchronisée avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation de la base de données :', error);
  }
};

syncDatabase();

// Exporter les modèles sous un objet 'models'
export const models = { User, Action, User_Action, Riddle, Clue, User_Clue, User_Riddle };


