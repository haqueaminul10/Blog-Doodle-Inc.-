const Sequelize = require("sequelize");

const sequelize = new Sequelize("dodo", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
