const express = require("express")
const router = express.Router()
const controller = require("./../controllers/blog.controller")
const bodyValidator = require("./../middlewares/bodyValidator")
const authMiddleware = require("./../middlewares/auth")
const blogValidator = require("./../validators/blog.validator")

router.use(authMiddleware.auth)
router.get("/create", controller.displayCreateBlogPage)
router.post("/post", bodyValidator(blogValidator), controller.createNewBlog)

module.exports = router