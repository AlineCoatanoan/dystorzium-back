module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clues', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      riddleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'riddles', // le nom de la table, pas du modèle
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: true,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('clues');
  }
};
