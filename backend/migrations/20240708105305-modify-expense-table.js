'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('expense', 'group_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('expense', 'group_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'id',
      },
      onUpdate: null,
      onDelete: null,
    });
  }
};
