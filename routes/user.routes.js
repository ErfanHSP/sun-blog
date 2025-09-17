const express = require("express")
const router = express.Router()
const controller = require("./../controllers/user.controller")
const bodyValidator = require("./../middlewares/bodyValidator")
const authMiddleware = require("./../middlewares/auth")

router.use(authMiddleware.auth)
router.get("/panel", controller.displayUserPanelPage)

router.route("/profile")
    .get(controller.getMe)
    .put(controller.editUserInfo)

module.exports = router