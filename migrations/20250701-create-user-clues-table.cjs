// migrations/20250701-create-user-clues-table.js

module.exports = { 
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_clues', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'users', // bien le nom de la table en DB (pas le modèle JS)
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      clue_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'clues',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      date_requested: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_clues');
  },
};