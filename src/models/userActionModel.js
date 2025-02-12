// models/userActionModel.js
import { DataTypes } from 'sequelize';
import db from '../config/dbclient';
import User from './userModel';
import Action from './actionModel';

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
  date_performed: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['in progress', 'completed', 'abandoned']],
    },
  },
}, {
  timestamps: false,
  primaryKey: false,
});

