const { DataTypes } = require("sequelize");

const BlogsTags = (sequelize) => {
  return sequelize.define(
    "blogs_tags",
    {},
    {
      tableName: "blogs_tags",
      timestamps: false,
    }
  );
};

module.exports = BlogsTags;
