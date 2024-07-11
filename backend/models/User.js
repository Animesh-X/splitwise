const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name'
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        this.setDataValue('password', hashedPassword);
      }
    },
    profileImageURL: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'image_url'
    },
  }, {
    timestamps: false,
    tableName: 'users'
  });

  User.associate = function(models) {
    User.belongsToMany(models.Group, {
      through: models.UserGroup,
      foreignKey: 'userId'
    });
    User.belongsToMany(models.User, {
      through: models.UserFriend,
      as: 'Friends',
      foreignKey: 'userId',
      otherKey: 'friendId'
    });
    User.hasMany(models.ExpenseItem, { foreignKey: 'userId' });
  };

  return User;
};
