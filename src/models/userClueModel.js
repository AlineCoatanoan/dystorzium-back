// models/userClueModel.js
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbclient.js';
import { User } from './userModel.js';
import { Clue } from './clueModel.js';

// models/userClueModel.js
export class User_Clue extends Model {
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
          primaryKey: true,  
        },
        clue_id: {
          type: DataTypes.INTEGER,
          references: {
            model: Clue,
            key: 'id',
          },
          onDelete: 'CASCADE',
          primaryKey: true, 
        },
        date_requested: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'User_Clue',
        tableName: 'user_clues',
        timestamps: false,
      }
    );
  }
}

User_Clue.init(sequelize);
