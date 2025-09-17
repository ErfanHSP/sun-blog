const express = require("express")
const app = express()
const {sequelize} = require("./db")
const cookieParser = require("cookie-parser")

// configs
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser("cookie-sec-1230"))

// Database sync
sequelize.sync()
  .then(() => console.log("✅ Models synced"))
  .catch((err) => console.error("❌ Sync error:", err));


// Server health check
app.get("/health", (req, res, next) => {
    try {
        res.json({
            message: "Server is up and running",
            success: true
        })
    } catch (error) {
        console.error("Server health check went wrong: ", error)
    }
})

// routes
const authRouter = require("./routes/auth.routes")
const userRouter = require("./routes/user.routes")
const blogRouter = require("./routes/blog.routes")
app.use("/auth", authRouter)
app.use("/me", userRouter)
app.use("/blog", blogRouter)

module.exports = {app}