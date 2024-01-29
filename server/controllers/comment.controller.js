const Comment = require("../model/comment.model");

const createComment = async (req, res) => {
  try {
    const { user_email, user_name } = req.user;

    const { blogId, comment_body } = req.body;

    const newComment = await Comment.create({
      blogId,
      comment_body,
      user_email,
      user_name,
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ message: "Error creating comment" });
  }
};

module.exports = { createComment };
