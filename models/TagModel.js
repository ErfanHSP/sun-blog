const { DataTypes } = require("sequelize");

const Tag = (sequelize) => {
  return sequelize.define(
    "tag",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "tags",
      timestamps: false,
    }
  );
};

module.exports = Tag;
