const { DataTypes } = require("sequelize")
const {sequelize} = require("../db")

const Blog = sequelize.define("Blog", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 200]
        }
    },
    content: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    featuredImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM("published", "draft", "archived"),
        defaultValue: "draft"
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    tags: {
        type: DataTypes.JSON(),
        defaultValue: []
    },
    metaTitle: {
        type: DataTypes.STRING,
        allowNull: true
    },
    metaDescription: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true,
    hooks: {
        beforeValidate: (blog) => {
            if (blog.title && !blog.slug) {
                blog.slug = blog.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-') // replace all characters contains AZ and not numbers with -
                .replace(/(^-|-$)+/g, ''); // replaces - and | from begining and end of the string
            }
        }
    }
})

module.exports = Blog