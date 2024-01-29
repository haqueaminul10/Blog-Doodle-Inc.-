const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.connection.js");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  contact_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Models synchronized successfully");
  })
  .catch((err) => {
    console.error("Error synchronizing models:", err);
  });

module.exports = User;
