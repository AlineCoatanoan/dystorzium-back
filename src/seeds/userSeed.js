import bcrypt from "bcrypt";
import { sequelize } from '../config/dbclient.js'
import { models } from "../models/index.js";

const { User } = models;

export const userSeed = async () => {
  await sequelize.sync();
  // Utilisateurs avec tous les champs requis
  const users = [
    {
      id: 1,
      firstName: "Aline",
      lastName: "Coding",
      email: "aline.coding@mail.com",
      password: "aline!", // Mot de passe en clair
      role: "admin",
    },
    {
      id: 2,
      firstName: "Chandler",
      lastName: "Bing",
      email: "bing@mail.com",
      password: "chandler!", // Mot de passe en clair
      role: "user",
    },
  ];

  for (const user of users) {
    try {
      // Hachage du mot de passe avant de le sauvegarder
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Créer l'utilisateur dans la base de données avec le mot de passe haché
      await User.create({
        ...user,
        password: hashedPassword, // Utilisation du mot de passe haché
      });
      console.log("User seeded ✅");
    } catch (error) {
      console.error("❌ Error seeding users:", error);
    }
  }
};