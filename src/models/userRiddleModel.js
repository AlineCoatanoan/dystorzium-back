// models/userRiddleModel.js
import { DataTypes } from 'sequelize';
import db from '../config/dbclient';
import User from './userModel';
import Riddle from './riddleModel';

export const User_Riddle = db.define('User_Riddle', {
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
  state: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['in progress', 'completed', 'abandoned']],
    },
  },
  date_started: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  date_completed: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: false,
  primaryKey: false,
});

