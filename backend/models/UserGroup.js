module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    userId: {
      type: DataTypes.UUID,
      field: 'user_id',
      primaryKey: true,
      references: {
        model: 'users', // Name of the Users table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    groupId: {
      type: DataTypes.UUID,
      field: 'group_id',
      primaryKey: true,
      references: {
        model: 'groups', // Name of the Groups table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    timestamps: false,
    tableName: 'user_groups'
  });

  return UserGroup;
};
