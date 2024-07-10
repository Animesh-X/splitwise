const { Sequelize } = require('sequelize');
const config = require("../utils/config");

const sequelize = new Sequelize(config.MYSQL_DATABASE, config.MYSQL_USER, config.MYSQL_PASSWORD, {
    host: config.MYSQL_HOST,
    dialect: "mysql"
});

module.exports = sequelize;