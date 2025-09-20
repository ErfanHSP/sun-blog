const { Sequelize } = require("sequelize");
const configs = require("./configs");

const sequelize = new Sequelize({
  host: configs.db.host,
  username: configs.db.name,
  password: configs.db.password,
  database: configs.db.name,
  dialect: configs.db.dialect,
  logging: configs.node_env === "production" ? false : true,
});
const connectToDB = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("DB connection succeeded✅");
    })
    .catch((err) => {
      console.error("DB connection error❌", err);
    });
};

module.exports = { connectToDB, sequelize };
