const {app} = require("./app")
const configs = require("./configs/configs")
const {connectToDB} = require("./db")

const start = () => {
    try {
        app.listen(configs.port || 7000, () => {
        console.log(`Server is running on port ${configs.port} 🚀`)
        })
        connectToDB()
    } catch (error) {
        console.error(`Server starting error: `, error)
    }
}

start()