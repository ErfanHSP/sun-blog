exports.authentication = (req, res, next) => {
    try {
        const token = req.cookie("token")
        console.log(token)
    } catch (error) {
        next(error)
    }
}