import { sequelize } from '../dbclient.js'; // adapte le chemin si besoin
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

async function resetDatabase() {
  try {
    console.log('📦 Drop de toutes les tables...');
    await sequelize.drop(); // supprime toutes les tables

    console.log('🚀 Lancement des migrations...');
    await execPromise('npx sequelize db:migrate --config src/config/config.cjs');

    console.log('🌱 Lancement des seeds...');
    await execPromise('npx sequelize db:seed:all --config src/config/config.cjs');

    console.log('✅ Base réinitialisée avec succès !');
  } catch (error) {
    console.error('❌ Erreur pendant la réinitialisation :', error);
  } finally {
    await sequelize.close();
    console.log('🔌 Connexion DB fermée.');
  }
}

resetDatabase();
