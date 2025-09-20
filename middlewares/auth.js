const jwt = require("jsonwebtoken");
const configs = require("../configs");
const UserModel = require("../models/UserModel");

exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found!",
        tokenError: true,
      });
    }
    const decoded = jwt.verify(token, configs.auth.token_secret);
    const user = await UserModel.findOne({
      where: { id: decoded?.userID },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
        tokenError: true,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
