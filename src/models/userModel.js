// models/userModel.js
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbclient.js';

export class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: DataTypes.STRING(100),
          unique: true,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        registrationDate: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        role: {
          type: DataTypes.STRING(20),
          allowNull: false,
          validate: {
            isIn: [['user', 'admin']],
          },
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
      }
    );
  }
}

User.init(sequelize);