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
    await queryInterface.removeColumn('expense_item', 'remaining_amount');
    await queryInterface.addColumn('expense_item', 'amountOwed', {
      type: Sequelize.FLOAT,
      allowNull: false,
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('expense_item', 'amountOwed');
    await queryInterface.addColumn('expense_item', 'remaining_amount', {
      type: Sequelize.FLOAT,
      allowNull: false,
    })
  }
};
