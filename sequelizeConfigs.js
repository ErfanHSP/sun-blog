const configs = require("./configs");

module.exports = {
  development: {
    username: configs.db.user,
    password: configs.db.password,
    database: configs.db.name,
    host: configs.db.host,
    dialect: configs.db.dialect,
  },
  test: {
    username: configs.db.user,
    password: configs.db.password,
    database: configs.db.name,
    host: configs.db.host,
    dialect: configs.db.dialect,
  },
  production: {
    username: configs.db.user,
    password: configs.db.password,
    database: configs.db.name,
    host: configs.db.host,
    dialect: configs.db.dialect,
  },
};
