import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbclient.js'; // Importer la connexion Sequelize depuis dbclient.js

export class Riddle extends Model {
  static init(sequelize) {
    return super.init(
      {
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
        isMultiStep: {
          type: DataTypes.BOOLEAN,
          defaultValue: false, // Pour indiquer si l'énigme se fait en plusieurs étapes
        },
      },
      {
        sequelize, // On passe directement l'instance sequelize ici
        modelName: 'Riddle',
        tableName: 'riddles',
        timestamps: true,
      }
    );
  }
}

// Initialiser le modèle avec sequelize
Riddle.init(sequelize);  // Il faut appeler `init` après avoir importé `sequelize`

