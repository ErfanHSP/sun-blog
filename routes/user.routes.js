const express = require("express")
const router = express.Router()
const controller = require("./../controllers/user.controller")
const bodyValidator = require("./../middlewares/bodyValidator")
const authValidator = require("./../validators/auth.validator")

router.get("/panel", controller.displayUserPanelPage)

router.post("/settings/edit-info", controller.editUserInfo)

module.exports = router