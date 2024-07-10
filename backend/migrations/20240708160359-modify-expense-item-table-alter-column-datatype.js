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
    await queryInterface.removeColumn('expense_item', 'amount_paid');
    await queryInterface.removeColumn('expense_item', 'remaining_amount');

    await queryInterface.addColumn('expense_item', 'amount_paid', {
      type: Sequelize.FLOAT,
      allowNull: false,
    })
    await queryInterface.addColumn('expense_item', 'remaining_amount', {
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
    await queryInterface.removeColumn('expense_item', 'amount_paid');
    await queryInterface.removeColumn('expense_item', 'remaining_amount');
    await queryInterface.addColumn('expense_item', 'amount_paid', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });

    await queryInterface.addColumn('expense_item', 'remaining_amount', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });
  }
};
