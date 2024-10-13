const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Signup logic
exports.signup = async (req, res) => {
  // Add validation logic here
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({ ...req.body, password: hashedPassword });

  try {
    await user.save();
    res.status(201).json({ message: 'User created successfully', user_id: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Login logic
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(400).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during login' });
  }
};

