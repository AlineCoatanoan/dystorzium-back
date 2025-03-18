// models/userRiddleModel.js
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbclient.js';
import { User } from './userModel.js';
import { Riddle } from './riddleModel.js';

export class User_Riddle extends Model {
  static init(sequelize) {
    return super.init(
      {
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
        response_submitted: {
          type: DataTypes.STRING(255), // Réponse soumise par le joueur
        },
      },
      {
        sequelize,
        modelName: 'User_Riddle',
        tableName: 'user_riddles',
        timestamps: false,
      }
    );
  }
}

User_Riddle.init(sequelize);