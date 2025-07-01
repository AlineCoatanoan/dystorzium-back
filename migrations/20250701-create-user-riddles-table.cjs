// migrations/20250701-create-user-riddles-table.js

module.exports = { 
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_riddles', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      riddle_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'riddles',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      state: {
        type: Sequelize.STRING(20),
        allowNull: false,
        // La validation 'isIn' ne passe pas en migration,
        // il faudra la gérer côté modèle uniquement
      },
      date_started: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      date_completed: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      response_submitted: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_riddles');
  },
};