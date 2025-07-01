import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./src/config/dbclient.js"; // Importer l'instance de Sequelize configurée
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./src/routes/router.js";
import { errorMiddleware } from "../../dystorzium/dystorzium-back/src/middlewares/errorMiddleware.js";
import { notFoundMiddleware } from "../dystorzium-back/src/middlewares/notFoundMiddleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Je te vois...");
});

// Router
app.use("/", router);

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

// Connexion à la base de données avec Sequelize (tu n'as plus besoin de créer une nouvelle instance ici)
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection à la base de données réussie.");
  })
  .catch((err) => {
    console.error("Impossible de se connecter à la base de données:", err);
  });
