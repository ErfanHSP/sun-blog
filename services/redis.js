const {Redis} = require("ioredis")
const bcrypt = require("bcrypt")
const configs = require("../configs/configs")

const redis = new Redis({
    host: "localhost",
    port: "6379"
})

const getPhoneOtpRedisKey = (phone) => {
    return `phone-otp:${phone}`
}
const parseOtpExpireTimeIntoSeconds = (time) => {
    const mins = parseInt(time)
    const seconds = mins * 60
    return seconds
}


const generatePhoneOtpCode = async (phone, length = 5) => {
    let digits = "1234567890"
    let otp = ""
    for (let i = 1; i <= length; i++) {
        otp += Math.floor(Math.random() * digits.length)
    }
    let hashOtp = bcrypt.hashSync(otp, 10)
    await redis.set(getPhoneOtpRedisKey(phone), hashOtp, "EX", parseOtpExpireTimeIntoSeconds(configs.auth.phone_otp_expire))
    return otp
}

const getPhoneOtpCodeDetails = async (phone) => {
    const otp = await redis.get(getPhoneOtpRedisKey(phone))
    console.log("otp : ", otp)
    if (!otp) {
        return {
            expired: true,
            remainingTime: 0
        }
    }
    const remainingTime = await redis.ttl(getPhoneOtpRedisKey(phone))
    return {
        expried: false,
        remainingTime
    }
}

module.exports = {
    generatePhoneOtpCode,
    getPhoneOtpCodeDetails
}