const { DataTypes } = require("sequelize");
const zlib = require("zlib");
const sequelize = require('../db');

const Group = sequelize.define("group", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        set(description) {
            this.setDataValue("description", zlib.deflateSync(description).toString("base"))
        },
        get() {
            const description = this.getDataValue("description");
            return zlib.inflateSync(Buffer.from(description, "base"));
        }
    },
    createdBy: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        },
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING,
    }
},{
    timestamps: false,
    tableName: 'group'
});

module.exports = Group;