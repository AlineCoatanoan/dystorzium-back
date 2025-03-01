// models/userActionModel.js
import { DataTypes } from 'sequelize';
import db from '../config/dbclient';
import User from './userModel';
import Action from './actionModel';

// models/userActionModel.js
export const User_Action = db.define('User_Action', {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  action_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Action,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  date_validation: {
    type: DataTypes.DATE,
    allowNull: true, // Null tant que l'énigme n'est pas validée
  },  
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['in progress', 'completed', 'abandoned']],
    },
  },
  response_submitted: {  // Réponse soumise à l'action
    type: DataTypes.STRING(255),
  },
}, {
  timestamps: false,
  primaryKey: false,
});


