"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Blogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 200],
        },
      },
      content: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      featuredImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("published", "draft", "archived"),
        defaultValue: "draft",
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      metaTitle: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      metaDescription: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Blogs");
  },
};
