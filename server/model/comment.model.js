const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.connection.js");

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment_body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  user_name: {
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

module.exports = Comment;
