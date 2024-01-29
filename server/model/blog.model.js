const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.connection.js");
const Comment = require("./comment.model.js");
const Blog = sequelize.define("Blog", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  blog_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  blog_body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Blog.hasMany(Comment, { as: "comments", foreignKey: "blogId" });

sequelize
  .sync()
  .then(() => {
    console.log("Models synchronized successfully");
  })
  .catch((err) => {
    console.error("Error synchronizing models:", err);
  });

module.exports = Blog;
