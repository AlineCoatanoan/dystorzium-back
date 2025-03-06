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
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT, // Contenu de l'énigme (texte, lien, etc.)
    allowNull: true,
  },
  solution: {
    type: DataTypes.STRING, // Acceptation de réponses textuelles
    allowNull: false,
  },
   type: {
    type: DataTypes.ENUM('text', 'audio', 'image', 'interactive'),
    allowNull: false,
    defaultValue: 'text', // Par défaut, une énigme textuelle
  },
  order: {
    type: DataTypes.INTEGER, // Pour organiser les énigmes dans un ordre précis
    allowNull: false,
  },
  is_multi_step: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Pour indiquer si l'énigme se fait en plusieurs étapes
  },
  next_riddle_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Permet de lier à l’énigme suivante
    references: {
      model: 'Riddles',
      key: 'id',
    },
  },
});

export default Riddle;
