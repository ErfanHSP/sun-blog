const express = require("express")
const app = express()

// configs
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

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

app.use("/auth", authRouter)

module.exports = {app}