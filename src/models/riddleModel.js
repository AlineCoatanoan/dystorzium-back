// models/riddleModel.js
import { DataTypes } from 'sequelize';
import db from '../config/dbclient';

// models/riddleModel.js
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
    type: DataTypes.INTEGER,  // Changer en INTEGER si tu attends des résultats numériques
    set(value) {
      if (typeof value === 'string') {
        this.setDataValue('solution', parseInt(value.trim())); // Convertir en nombre si c'est une chaîne
      } else {
        this.setDataValue('solution', value);
      }
    },
  },
  content: {
    type: DataTypes.TEXT,
  },
  is_multi_step: {  // Indique si l'énigme a plusieurs étapes
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});


