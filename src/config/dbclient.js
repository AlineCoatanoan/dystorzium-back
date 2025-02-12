import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME, // Nom de la base de données
  process.env.DB_USER, // Nom d'utilisateur
  process.env.DB_PASSWORD, // Mot de passe
  {
    host: process.env.DB_HOST || 'localhost', // Hôte de la base de données (localhost par défaut)
    dialect: 'postgres', // Type de base de données
    logging: true, // Active les logs SQL dans la console
    define: {
      timestamps: false, // Désactive les timestamps automatiques si tu n'en veux pas
    },
  }
);
