module.exports = (sequelize, DataTypes) => {
    const ExpenseItem = sequelize.define("ExpenseItem", {
      expenseId: {
        type: DataTypes.INTEGER,
        field: 'expense_id',
        primaryKey: true,
        references: {
          model: 'expense',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        allowNull: false
      },
      amountPaid: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'amount_paid'
      },
      amountOwed: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }
    }, {
      timestamps: false,
      tableName: 'expense_item'
    });
  
    ExpenseItem.associate = function(models) {
      ExpenseItem.belongsTo(models.Expense, { foreignKey: 'expenseId' });
      ExpenseItem.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return ExpenseItem;
  };
  