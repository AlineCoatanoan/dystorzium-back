import { sequelize } from "../dbclient.js";    
import { userSeed } from "../../seeds/userSeed.js";
import { riddleSeed } from "../../seeds/riddleSeed.js";        
import { clueSeed } from "../../seeds/clueSeed.js";

export const resetDataBase = async () => {
    try {
        await sequelize.sync({ force: true }); // Forcer la synchronisation de la base de données
        console.log("Base de données synchronisée avec succès !");
        await userSeed();
        await riddleSeed();
        await clueSeed();
        console.log("Données de départ synchronisées avec succès !");
    } catch (error) {
        console.error("Impossible de synchroniser la base de données:", error);
    }
}
resetDataBase();