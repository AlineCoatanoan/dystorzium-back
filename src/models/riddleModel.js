// models/riddleModel.js
import { DataTypes } from 'sequelize';
import db from '../config/dbclient';

export const Riddle = db.define('Riddle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
  },
  description: {
    type: DataTypes.TEXT,
  },
  solution: {
    type: DataTypes.STRING(255),
  },
  content: {
    type: DataTypes.TEXT,
  },
});

