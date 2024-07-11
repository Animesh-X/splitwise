module.exports = (sequelize, DataTypes) => {
    const UserFriend = sequelize.define('UserFriend', {
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
        primaryKey: true,
      },
      friendId: {
        type: DataTypes.UUID,
        field: 'friend_id',
        primaryKey: true,
      }
    }, {
      timestamps: false,
      tableName: 'user_friends'
    });
  
    return UserFriend;
  };
  