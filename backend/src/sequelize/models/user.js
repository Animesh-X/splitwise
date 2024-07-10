const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require('../db');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,

    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(password) {
            const hashedPassword = bcrypt.hashSync(password, 10);
            this.setDataValue('password', hashedPassword);
        }
    },
    image_url: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false,
    tableName: 'user'
});

module.exports = User;