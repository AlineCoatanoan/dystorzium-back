import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbclient.js';

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
          type: DataTypes.TEXT,
          allowNull: true,
        },
        solution: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        order: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        isMultiStep: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        nextRiddleId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'riddles',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      },
      {
        sequelize,
        modelName: 'Riddle',
        tableName: 'riddles',
        timestamps: true,
      }
    );
  }
}

Riddle.init(sequelize);
