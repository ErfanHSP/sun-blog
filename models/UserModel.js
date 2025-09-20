const { DataTypes } = require("sequelize");
const { sequelize: db } = require("../db");

const User = (sequelize) => {
  return db.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("ADMIN", "USER"),
        allowNull: false,
        defaultValue: "USER",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );
};

module.exports = User;
