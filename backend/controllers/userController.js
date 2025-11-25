const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Signup Controller
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

    res.status(201).json({ message: "User created successfully.", user_id: user._id });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Find user by email or username
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(400).json({ status: false, message: "Invalid username/email or password" });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ status: false, message: "Invalid username/email or password" });
    }

    // Login successful
    res.status(200).json({ message: "Login successful." });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
