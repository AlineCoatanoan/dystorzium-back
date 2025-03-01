// models/actionModel.js
import { DataTypes } from 'sequelize';
import db from '../config/dbclient';
import User from './userModel';
import Riddle from './riddleModel';

// models/actionModel.js
export const Action = db.define('Action', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  riddle_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Riddle,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  description: {
    type: DataTypes.TEXT,
  },
  state: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['in progress', 'completed', 'abandoned']],
    },
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  response_submitted: {
    type: DataTypes.INTEGER,  // Si la réponse est un nombre
  },
  clue_id: {  // Référence à un indice pour l'action
    type: DataTypes.INTEGER,
    references: {
      model: Clue,
      key: 'id',
    },
  },
});


