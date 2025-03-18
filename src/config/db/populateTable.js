import { sequelize } from '../dbclient.js';
import { userSeed } from '../../seeds/userSeed.js';
import { riddleSeed } from '../../seeds/riddleSeed.js';
import { clueSeed } from '../../seeds/clueSeed.js';
// Associer les modèles entre eux   

const populateTable = async () => { 
    try {
    console.log("🚀 Populating tables...");
    await userSeed();
    await riddleSeed();
    await clueSeed();
    console.log("✅ Tables populated successfully!");
  } catch (error) {
    console.error("❌ Error populating tables:", error);
  } finally {
    await sequelize.close();
  }
};

populateTable();