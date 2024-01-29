const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { user_name, user_email, contact_number, password } = req.body;

    const newUser = await User.create({
      user_name: user_name,
      user_email: user_email,
      contact_number: contact_number,
      password: password,
    });

    res
      .status(200)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { user_email, password } = req.body;

    const user = await User.findOne({ where: { user_email: user_email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        user_email: user.user_email,
        user_name: user.user_name,
      },
      "ABCDE",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token: token,
      user_name: user.user_name,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
