const path = require("path")
const frontendPath = path.join(__dirname, "../views")


require("dotenv").config()

module.exports = {
    port: process.env.PORT,
    dev_database: process.env.DEV_DB,
    auth: {
        token_expire: process.env.TOKEN_EXPIRE,
        token_secret: process.env.TOKEN_SECRET,
        otp_expire: process.env.PHONE_OTP_EXPRIE
    },
    frontendPath,
    sms: {
        base_url: process.env.BASE_URL,
        api_key: process.env.FARAZ_SMS_API_KEY
    }
}