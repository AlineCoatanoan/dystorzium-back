// models/actionModel.js
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbclient.js'; // Importe la connexion Sequelize depuis dbclient.js
import { User } from './userModel.js';
import { Riddle } from './riddleModel.js';
import { Clue } from './clueModel.js'; // Assure-toi d'importer le modèle 'Clue'

// models/actionModel.js
export class Action extends Model {
  static init(sequelize) {
    return super.init(
      {
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
          type: DataTypes.INTEGER, // Si la réponse est un nombre
        },
        clue_id: { // Référence à un indice pour l'action
          type: DataTypes.INTEGER,
          references: {
            model: Clue,
            key: 'id',
          },
        },
      },
      {
        sequelize,
        modelName: 'Action',
        tableName: 'actions',
        timestamps: true,
      }
    );
  }
}

Action.init(sequelize); // Initialise le modèle Action