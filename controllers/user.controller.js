const path = require("path")
const configs = require("./../configs/configs")

exports.displayUserPanelPage = (req, res, next) => {
    try {
        res.sendFile(path.join(configs.frontendPath, "user-panel.html"))
    } catch (error) {
        next(error)
    }
}

exports.editUserInfo = (req, res, next) => {
    try {
        
    } catch (error) {
        next()
    }
}