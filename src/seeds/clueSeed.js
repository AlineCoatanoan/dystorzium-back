import { sequelize } from '../config/dbclient.js'
import { Clue } from '../models/clueModel.js'; // Assurez-vous que ce modèle est bien défini

export const clueSeed = async () => {
  await sequelize.sync(); // Réinitialise la base de données (⚠️ Supprime toutes les données existantes)

  const clues = [
    { text: 'Indice pour le premier mystère', riddleId: 1 },
    { text: 'Recherchez les anomalies sur le site', riddleId: 2 },
    { text: 'Le lien invisible vous mène au vecteur', riddleId: 3 },
    { text: 'Attention aux oscillations', riddleId: 4 },
    { text: 'Cherchez un fichier caché pour trouver la solution', riddleId: 5 },
    { text: 'Trouvez la bonne phrase sur Instagram', riddleId: 6 },
    { text: 'Le mot de passe est sur un forum', riddleId: 7 },
    { text: 'Utilisez PDF.js pour résoudre ce fichier', riddleId: 8 },
    { text: 'Les coordonnées secrètes vous guideront', riddleId: 9 },
    { text: 'Scannez le QR Code pour voir la fin', riddleId: 10 },
  ];

  await Clue.create(clues);
  console.log('🌟 Tous les indices ont été ajoutés à la base de données !');
};

clueSeed();
