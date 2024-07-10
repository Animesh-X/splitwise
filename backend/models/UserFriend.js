module.exports = (sequelize, DataTypes) => {
    const UserFriend = sequelize.define('UserFriend', {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      friendId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      }
    }, {
      timestamps: false,
      tableName: 'user_friends'
    });
  
    return UserFriend;
  };
  