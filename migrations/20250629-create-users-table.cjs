// migrations/20250701-create-users-table.js

module.exports = {
   async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      registrationDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      role: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
          isIn: [['user', 'admin']],
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
