import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Bienvenue sur Dystorzium !");
});

// Définition du port
const PORT = process.env.PORT || 3000;

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
