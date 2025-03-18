// models/clueModel.js
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbclient.js';
import { Riddle } from './riddleModel.js';

// models/clueModel.js
export class Clue extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        riddleId: {
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
      },
      {
        sequelize,
        modelName: 'Clue',
        tableName: 'clues',
        timestamps: true,
      }
    );
  }
}

Clue.init(sequelize);