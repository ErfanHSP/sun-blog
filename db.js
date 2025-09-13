const {Sequelize} = require("sequelize")
const configs = require("./configs/configs")

const sequelize = new Sequelize({
    host: "localhost",
    username: "root",
    password: "1234",
    database: configs.dev_database,
    dialect: "mysql",
    logging: false
})
const connectToDB = () => {
    sequelize.authenticate()
        .then(() => {
            console.log("DB connection succeeded✅")
        })
        .catch((err) => {
            console.error("DB connection error❌", err)
        })
}

module.exports = {connectToDB, sequelize}