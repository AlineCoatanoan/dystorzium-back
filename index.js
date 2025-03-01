import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorMiddleware from "../../dystorzium/dystorzium-back/src/middlewares/errorMiddleware.js";
import notFoundMiddleware from "../dystorzium-back/src/middlewares/notFoundMiddleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Bienvenue sur Dystorzium !");
});

// Middleware pour gérer les routes non trouvées (404)
app.use(notFoundMiddleware);

// Middleware global pour toutes les erreurs
app.use(errorMiddleware);

// Définition du port
const PORT = process.env.PORT || 3000;

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
