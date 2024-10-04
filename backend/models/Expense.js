const zlib = require("zlib");

module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define("Expense", {
    id: {
      type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      set(description) {
        if (description) {
          this.setDataValue("description", zlib.deflateSync(description).toString("base64"));
        } else {
          this.setDataValue("description", null);
        }
      },
      get() {
        const description = this.getDataValue("description");
        if (description) {
          return zlib.inflateSync(Buffer.from(description, "base64")).toString();
        }
        return null;
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      field: 'group_id',
      references: {
        model: 'groups', 
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      allowNull: false
    },
    imageURL: {
      type: DataTypes.STRING,
      field: 'image_url'
    },
    createdBy: {
        type: DataTypes.INTEGER,
        field: 'created_by',
        references: {
            model: 'users',
            key: 'id',
            onUpdate: 'CASCADE'
        }
    }
  }, {
    timestamps: false,
    tableName: 'expense'
  });

  Expense.associate = function(models) {
    Expense.belongsTo(models.Group, { foreignKey: 'groupId' });
    Expense.belongsTo(models.User,{ foreignKey: 'createdBy', as: 'createdByUser'});
    Expense.hasMany(models.ExpenseItem, { foreignKey: 'expenseId', as: 'transactions' });
  };

  return Expense;
};
