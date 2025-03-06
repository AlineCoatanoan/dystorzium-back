import db from '../config/dbclient.js';
import { Clue } from '../models/clueModel.js'; // Assurez-vous que ce modèle est bien défini
import { Riddle } from '../models/riddleModel.js'; // Si tu as besoin de valider les riddles

const clueSeeds = async () => {
  await db.sync({ force: true }); // Réinitialise la base de données (⚠️ Supprime toutes les données existantes)

  const clues = [
    { clue_text: 'Indice pour le premier mystère', riddle_id: 1 },
    { clue_text: 'Recherchez les anomalies sur le site', riddle_id: 2 },
    { clue_text: 'Le lien invisible vous mène au vecteur', riddle_id: 3 },
    { clue_text: 'Attention aux oscillations', riddle_id: 4 },
    { clue_text: 'Cherchez un fichier caché pour trouver la solution', riddle_id: 5 },
    { clue_text: 'Trouvez la bonne phrase sur Instagram', riddle_id: 6 },
    { clue_text: 'Le mot de passe est sur un forum', riddle_id: 7 },
    { clue_text: 'Utilisez PDF.js pour résoudre ce fichier', riddle_id: 8 },
    { clue_text: 'Les coordonnées secrètes vous guideront', riddle_id: 9 },
    { clue_text: 'Scannez le QR Code pour voir la fin', riddle_id: 10 },
  ];

  await Clue.bulkCreate(clues);
  console.log('🌟 Tous les indices ont été ajoutés à la base de données !');
};

clueSeeds();
