const path = require("path");
const frontendPath = path.join(__dirname, "../views");

require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    pool_size: process.env.DB_POOL_SIZE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
  auth: {
    token_expire: process.env.TOKEN_EXPIRE,
    token_secret: process.env.TOKEN_SECRET,
    otp_expire: process.env.PHONE_OTP_EXPRIE,
    phone_otp_expire: process.env.PHONE_OTP_EXPIRE,
  },
  frontendPath,
  node_env: process.env.NODE_ENV,
  sms: {
    base_url: process.env.BASE_URL,
    api_key: process.env.FARAZ_SMS_API_KEY,
  },
};
