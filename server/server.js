const express = require(`express`);
const app = express();
app.use(express.json());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());
//DB CONNECTION//
const sequelize = require("./config/db.connection.js");
const userModel = require("./model/user.model.js");
const blogModel = require("./model/blog.model.js");
const commentModel = require("./model/comment.model.js");

const dbConnection = () => {
  try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
dbConnection();

/////////   REST API ////////
app.get("/", (req, res) => {
  res.status(200).send({
    message: "home route",
  });
});
const user = require("./controllers/user.controller.js");
const authMiddleware = require("./middleware/auth.middleware.js");
const blog = require("./controllers/blog.controller.js");
const comment = require("./controllers/comment.controller.js");
app.post("/register", authMiddleware.verifyToken, user.register);
app.post("/login", user.login);
app.get("/protected", authMiddleware.verifyToken, (req, res) => {
  res.json({ message: "You accessed the protected route", user: req.user });
});
app.post("/blog", authMiddleware.verifyToken, blog.createBlog);
app.get("/blogs", blog.allBlogs);
app.post("/comment", authMiddleware.verifyToken, comment.createComment);
const PORT = 9000;

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
