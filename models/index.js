const UserModel = require("./../models/UserModel")
const BlogModel = require("./../models/BlogModel")

UserModel.hasMany(BlogModel, {foreignKey: "userId", as: "blogs"})
BlogModel.belongsTo(UserModel, {foreignKey: "userId", as: "author"})

