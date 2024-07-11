const zlib = require("zlib");

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define("Group", {
    id: {
      type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
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
    createdBy: {
      type: DataTypes.UUID,
      field: 'created_by',
      references: {
        model: 'users', // Ensure the model name matches exactly with the User model definition
        key: 'id',
        onUpdate: 'CASCADE',
      },
      allowNull: false
    },
    imageURL: {
      type: DataTypes.STRING,
      field: 'image_url'
    }
  }, {
    timestamps: false,
    tableName: 'groups'
  });

  Group.associate = function(models) {
    Group.belongsTo(models.User, { foreignKey: 'createdBy' });
    Group.belongsToMany(models.User, {
      through: models.UserGroup,
      foreignKey: 'groupId'
    });
    Group.hasMany(models.Expense, { foreignKey: 'groupId' });
  };

  return Group;
};
