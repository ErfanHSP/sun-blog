"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      queryInterface.addColumn("blogs", "author_id", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      });
      queryInterface.createTable("blogs_tags", {
        blog_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "blogs",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        tag_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "tags",
            key: "id",
          },
          onDelete: "CASCADE",
        },
      });
      await queryInterface.addConstraint("blogs_tags", {
        type: "unique",
        name: "unique_blog_tag",
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn("blogs", "author_id");
      await queryInterface.dropTable("blogs_tags");
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
