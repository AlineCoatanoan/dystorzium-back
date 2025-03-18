import { sequelize } from '../config/dbclient.js'
import { Riddle } from '../models/riddleModel.js';

export const riddleSeed = async () => {
  await sequelize.sync(); // Réinitialise la base de données (⚠️ Supprime toutes les données existantes)

  const riddles = [
    {
      title: 'Inscription',
      description: 'Entrez le mot donné pour valider votre inscription.',
      content: 'Mot donné : SINGULARITY. Tapez-le dans le formulaire.',
      solution: 'SINGULARITY',
      type: 'text',
      order: 1,
      isMultiStep: false,
      nextRiddleId: 2, 
    },
    {
      title: 'Anomalie détectée',
      description: 'Deux mots clés sont nécessaires pour stabiliser la connexion.',
      content: 'Ils sont cachés sur le site, visibles à ceux qui savent regarder.',
      solution: ['DISTORSION', 'PASSAGE'],
      type: 'interactive',
      order: 2,
      isMultiStep: true,
      nextRiddleId: 3,
    },
    {
      title: 'Le lien invisible',
      description: 'Une anomalie est un déplacement sans raison apparente.',
      content:
        'Un point d’origine et une trajectoire peuvent être définis, mais ce qui relie ces deux éléments est souvent invisible. Dans certains modèles scientifiques, ce lien est appelé ______.',
      solution: 'VECTOR',
      type: 'text',
      order: 3,
      isMultiStep: false,
      nextRiddleId: 4,
    },
    {
      title: 'Rapport crypté',
      description: 'Trouvez les 4 mots manquants dans le rapport.',
      content:
        'Un fragment de rapport est apparu. Trouvez les 4 mots manquants : Oscillations, Nouvelles, Détecter, Existence.',
      solution: 'ONDE',
      type: 'interactive',
      order: 4,
      isMultiStep: true,
      nextRiddleId: 5,
    },
    {
      title: 'Le fichier perdu',
      description: 'Trouvez le rapport scientifique caché.',
      content:
        'Le phénomène ne peut être compris qu\'à travers un document caché. Il a été rédigé, classé, et déposé… mais il est accessible à qui saura le chercher.',
      solution: 'https://www.persee.fr/doc/phlou_0035-3841_1950_num_48_18_4284',
      type: 'text',
      order: 5,
      isMultiStep: false,
      nextRiddleId: 6,
    },
    {
      title: 'L\'ombre et la lumière',
      description: 'Trouvez le message caché sur Instagram.',
      content:
        'Certains scientifiques restent dans l’ombre. D’autres laissent des traces… même sur Instagram. Trouvez le bon compte et envoyez-lui un mail avec la bonne phrase.',
      solution:
        'Une des hypothèses majeures envisage que le Dystorzium pourrait constituer une passerelle vers une forme d’intelligence artificielle d’un type radicalement nouveau.',
      type: 'interactive',
      order: 6,
      isMultiStep: true,
      nextRiddleId: 7,
    },
    {
      title: 'Le fichier crypté',
      description: 'Trouvez le mot de passe pour décrypter le fichier.',
      content:
        'Un fichier est apparu sur le site. Mais il est crypté… Alnaticia pense que le mot de passe se trouve sur un forum.',
      solution: 'Framatorrent',
      type: 'text',
      order: 7,
      isMultiStep: false,
      nextRiddleId: 8,
    },
    {
      title: 'Déchiffrez le PDF',
      description: 'Entrez le mot de passe du fichier PDF.',
      content:
        'Utilisez PDF.js pour entrer le mot de passe et afficher le fichier.',
      solution: 'ANOMALIE',
      type: 'interactive',
      order: 8,
      isMultiStep: false,
      nextRiddleId: 9,
    },
    {
      title: 'Coordonnées secrètes',
      description: 'Trouvez l’emplacement caché.',
      content:
        'Une fois le fichier PDF décrypté, il affichera des coordonnées GPS. Entrez-les sur Google Maps.',
      solution: 'Ada Lovelace',
      type: 'text',
      order: 9,
      isMultiStep: false,
      nextRiddleId: 10,
    },
    {
      title: 'Le dernier indice',
      description: 'Scannez le QR Code.',
      content:
        'En entrant la bonne réponse, un QR Code apparaît. Scannez-le pour voir le message final.',
      solution: 'Fin du jeu',
      type: 'interactive',
      order: 10,
      isMultiStep: false,
      nextRiddleId: null, // Dernière énigme
    },
  ];

  await Riddle.create(riddles);
  console.log('🌟 Toutes les énigmes ont été ajoutées à la base de données !');
};

riddleSeed();
