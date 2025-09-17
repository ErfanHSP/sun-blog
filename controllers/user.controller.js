const path = require("path")
const configs = require("./../configs/configs")
const UserModel = require("./../models/UserModel")

exports.displayUserPanelPage = (req, res, next) => {
    try {
        res.sendFile(path.join(configs.frontendPath, "user-panel.html"))
    } catch (error) {
        next(error)
    }
}

exports.getMe = (req, res, next) => {
    try {
        const user = req.user
        res.status(200).json({
            success: true,
            message: "User is logged in.",
            user
        })
    } catch (error) {
        next(error)
    }
}

exports.editUserInfo = async (req, res, next) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found!",
                tokenExpired: true
            })
        }
        const {fullname, username, bio} = req.body
        
        if (!fullname || !username) {
            return res.status(401).json({
                success: false,
                message: "Validation failure."
            })
        }
        const isUsernameDuplicated = await UserModel.findOne({where: {username}})
        if (isUsernameDuplicated && user.username != username) {
            return res.status(400).json({
                success: false,
                message: "Username already in use."
            })
        }
        const [affectedCount] = await UserModel.update({
            username,
            fullname,
            bio: bio ? bio : "",
            isActive: true
        }, {where: {id: user.id}})
        
        if (affectedCount > 0) {
            return res.status(200).json({
                success: true,
                message: "Profile updated."
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Profile update failed."
            })
        }
    } catch (error) {
        next()
    }
}