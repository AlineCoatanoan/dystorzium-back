// models/userClueModel.js
import { DataTypes } from 'sequelize';
import db from '../config/dbclient';
import User from './userModel';
import Clue from './clueModel';

export const User_Clue = db.define('User_Clue', {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  clue_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Clue,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  date_requested: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  primaryKey: false,
});

