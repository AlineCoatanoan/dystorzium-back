// models/clueModel.js
import { DataTypes } from 'sequelize';
import db from '../config/dbclient';
import Riddle from './riddleModel';

export const Clue = db.define('Clue', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  riddle_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Riddle,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  text: {
    type: DataTypes.TEXT,
  },
  type: {
    type: DataTypes.STRING(50),
  },
});

