// seeders/20250701-clueSeed.cjs
module.exports = {
  async up(queryInterface, Sequelize) {
    const clues = [
      { text: 'Indice pour le premier mystère', riddleId: 1, createdAt: new Date(), updatedAt: new Date() },
      { text: 'Recherchez les anomalies sur le site', riddleId: 2, createdAt: new Date(), updatedAt: new Date() },
      { text: 'Le lien invisible vous mène au vecteur', riddleId: 3, createdAt: new Date(), updatedAt: new Date() },
      { text: 'Attention aux oscillations', riddleId: 4, createdAt: new Date(), updatedAt: new Date() },
      { text: 'Cherchez un fichier caché pour trouver la solution', riddleId: 5, createdAt: new Date(), updatedAt: new Date() },
      { text: 'Trouvez la bonne phrase sur Instagram', riddleId: 6, createdAt: new Date(), updatedAt: new Date() },
      { text: 'Le mot de passe est sur un forum', riddleId: 7, createdAt: new Date(), updatedAt: new Date() },
      { text: 'Utilisez PDF.js pour résoudre ce fichier', riddleId: 8, createdAt: new Date(), updatedAt: new Date() },
      { text: 'Les coordonnées secrètes vous guideront', riddleId: 9, createdAt: new Date(), updatedAt: new Date() },
      { text: 'Scannez le QR Code pour voir la fin', riddleId: 10, createdAt: new Date(), updatedAt: new Date() },
    ];
    await queryInterface.bulkInsert('clues', clues);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('clues', null, {});
  }
};
