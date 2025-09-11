const RedisService = require("./../services/redis")
const OtpCodeService = require("./../services/otp")
const path = require("path")
const configs = require("./../configs/configs")

exports.displayAuthPage = (req, res, next) => {
    try {
        res.sendFile(path.join(configs.frontendPath, "auth.html"))
    } catch (error) {
        next(error)
    }
}

exports.requestOtpCode = async (req, res, next) => {
    try {
        const {phone} = req.body
        console.log("phone number: ", phone)
        if (!phone) {
            return res.status(400).json({
                success: false,
                message: "phone number not found."
            })
        }
        let {remainingTime, expired} = await RedisService.getPhoneOtpCodeDetails(phone)
        console.log("remaining: ", remainingTime, "expired: ", expired)
        // if (!expired) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Otp code already sent.",
        //         remainingTime
        //     })
        // }
        let otpCode = await RedisService.generatePhoneOtpCode(phone)
        let token = await OtpCodeService.loginToFarazSms()
        
        await OtpCodeService.sendOtpCode(phone, otpCode, token)
        return res.status(200).json({
            success: true,
            message: "OTP code sent."
        })
    } catch (error) {
        next(error)
    }
}

exports.verifyOtpCode = (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}