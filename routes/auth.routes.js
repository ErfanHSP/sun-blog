const express = require("express")
const router = express.Router()
const controller = require("./../controllers/auth.controller")
const bodyValidator = require("./../middlewares/bodyValidator")
const authValidator = require("./../validators/auth.validator")

router.get("/login", controller.displayAuthPage)

router.post("/request-otp", bodyValidator(authValidator), controller.requestOtpCode)
router.post("/verify-otp", controller.verifyOtpCode)


module.exports = router