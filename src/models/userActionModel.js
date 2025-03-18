// models/userActionModel.js
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbclient.js';
import { User } from './userModel.js';
import { Action } from './actionModel.js';

// models/userActionModel.js
export class User_Action extends Model {
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
        action_id: {
          type: DataTypes.INTEGER,
          references: {
            model: Action,
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        date_validation: {
          type: DataTypes.DATE,
          allowNull: true, // Null tant que l'énigme n'est pas validée
        },
        status: {
          type: DataTypes.STRING(20),
          allowNull: false,
          validate: {
            isIn: [['in progress', 'completed', 'abandoned']],
          },
        },
        response_submitted: {  // Réponse soumise à l'action
          type: DataTypes.STRING(255),
        },
      },
      {
        sequelize,
        modelName: 'User_Action',
        tableName: 'user_actions',
        timestamps: false,
        primaryKey: false,
      }
    );
  }
}

User_Action.init(sequelize);