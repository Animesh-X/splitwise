const sequelize = require("./db");
const User = require("./models/user");
const Group = require("./models/group");

User.hasMany(Group, {
  foreignKey: "createdBy",
  sourceKey: "id",
});

Group.belongsTo(User, {
  foreignKey: "createdBy",
  sourceKey: "id",
});

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database & tables created!");
  } catch (err) {
    console.error("Unable to create database & tables:", err);
  }
};

module.exports = { 
    syncDatabase ,
    User,
    Group
};
