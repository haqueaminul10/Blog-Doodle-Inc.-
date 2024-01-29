const Blog = require("../model/blog.model");
const Comment = require("../model/comment.model");
const createBlog = async (req, res) => {
  try {
    const { blog_title, blog_body } = req.body;
    const userId = req.user.userId;
    const newBlog = await Blog.create({
      userId,
      blog_title,
      blog_body,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating blog post" });
  }
};

const allBlogs = async (req, res) => {
  try {
    const blogWithComments = await Blog.findAll({
      include: [{ model: Comment, as: "comments" }],
    });
    res.status(200).send(blogWithComments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching blogs with comments" });
  }
};

module.exports = { createBlog, allBlogs };
