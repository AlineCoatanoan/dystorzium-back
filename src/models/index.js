// src/models/index.js

import { sequelize } from '../config/dbclient.js'; // Importer la connexion à la BDD
import { User } from './userModel.js';
import { Riddle } from './riddleModel.js';
import { Clue } from './clueModel.js';
import { User_Clue } from './userClueModel.js';
import { User_Riddle } from './userRiddleModel.js';

// Associer les modèles entre eux
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


// Exporter les modèles sous un objet 'models'
export const models = { User, Riddle, Clue, User_Clue, User_Riddle };


