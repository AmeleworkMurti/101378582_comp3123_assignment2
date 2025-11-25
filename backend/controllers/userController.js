const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===================== SIGNUP =====================
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User created successfully",
      user_id: user._id
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message
    });
  }
};

// ===================== LOGIN =====================
exports.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Find user by username OR email
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }]
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token: token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

