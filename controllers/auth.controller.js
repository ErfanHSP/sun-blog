const RedisService = require("./../services/redis")
const OtpCodeService = require("./../services/otp")
const UserModel = require("../models/UserModel")
const path = require("path")
const configs = require("./../configs/configs")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const normalizePhone = require("./../utils/nomalizePhone")

exports.displayAuthPage = (req, res, next) => {
    try {
        res.sendFile(path.join(configs.frontendPath, "login.html"))
    } catch (error) {
        next(error)
    }
}

exports.requestOtpCode = async (req, res, next) => {
    try {
        const {phone} = req.body
        if (!phone) {
            return res.status(400).json({
                success: false,
                message: "phone number not found."
            })
        }
        let normalizedPhoneNumber = normalizePhone(phone)
        if (!normalizedPhoneNumber) {
            return res.status(400).json({
                success: false,
                message: "Phone number not found!"
            })
        }
        let {remainingTime, expired} = await RedisService.getPhoneOtpCodeDetails(normalizedPhoneNumber)
        // if (!expired) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Otp code already sent. Check your messages.",
        //         remainingTime
        //     })
        // }
        let otpCode = await RedisService.generatePhoneOtpCode(normalizedPhoneNumber)
        console.log("otpCode: ", otpCode)
        // await OtpCodeService.sendOtpCode(normalizedPhoneNumber, otpCode)
        return res.status(200).json({
            success: true,
            message: "OTP code sent."
        })
    } catch (error) {
        next(error)
    }
}

exports.verifyOtpCode = async (req, res, next) => {
    try {
        const {otp, phone} = req.body
        if (!otp || !phone) {
            return res.status(400).json({
                success: false,
                message: "Validation error."
            })
        }
        let normalizedPhoneNumber = normalizePhone(phone)
        const {savedOtp} = await RedisService.getPhoneOtpCodeDetails(normalizedPhoneNumber)        
        if (!savedOtp) {
            return res.status(401).json({
                success: false,
                message: "otp code expired",
                expired: true
            })
        }
        const checkOtp = bcrypt.compareSync(otp, savedOtp)
        if (!checkOtp) {
            return res.status(400).json({
                success: false,
                message: "Otp code is wrong."
            })
        }
        const existingUser = await UserModel.findOne({
            where: {phone: normalizedPhoneNumber}
        })
        console.log("existing User: ", typeof existingUser);
        
        if (!existingUser) {
            const user = UserModel.build({
                phone: normalizedPhoneNumber
            })
            await user.save()
            const token = jwt.sign({userID: user.id, role: user.role}, configs.auth.token_secret, {
                expiresIn: `${configs.auth.token_expire}d`
            })
            res.cookie("token", token, {
                maxAge: 1_210_000_000
            })
            return res.status(201).json({
                success: true,
                message: "User generated successfully."
            })
        } else {
            const token = jwt.sign({userID: existingUser.id, role: existingUser.role}, configs.auth.token_secret, {
                expiresIn: `${configs.auth.token_expire}d`
            })
            res.cookie("token", token, {
                maxAge: 1_210_000_000
            })
            return res.status(200).json({
                success: true,
                message: "User logged in successfully."
            })
        }
    } catch (error) {
        next(error)
    }
}