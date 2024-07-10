module.exports = (sequelize, DataTypes) => {
    const PaymentGraph = sequelize.define('PaymentGraph', {
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'group_id',
        primaryKey: true,
        references: {
            model: 'groups',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'user_id',
        references: {
            model: 'users',
            key: 'id',
            onUpdate: 'CASCADE',
        }
      },
      owesFrom: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'owes_from',
        references: {
            model: 'users',
            key: 'id',
            onUpdate: 'CASCADE',
        }
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    }, {
      timestamps: false,
      tableName: 'payment_graph'
    });
  
    PaymentGraph.associate = function(models) {
      PaymentGraph.belongsTo(models.Group, { foreignKey: 'groupId' });
      PaymentGraph.belongsTo(models.User, { foreignKey: 'userId' });
      PaymentGraph.belongsTo(models.User, { foreignKey: 'owesFrom' });
    };

    return PaymentGraph;
  };
  