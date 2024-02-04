
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const{CustomError,ValidationError,NotFoundError} =require('../middleware/error-handler')
let secretKey = process.env.SECRET_KEY

const isEmailValid = (email) => {
  // Regular expression for a simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ error: 'Please enter all data' });
    }

    // Check if the email is valid
    if (!isEmailValid(email)) {
      return res.json({ error: 'Invalid email address' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword, // Store the hashed password in the database
    });

    const data = await newUser.save();

    // Create JWT token with one day expiry time
    const token = jwt.sign({ userId: data._id }, secretKey, { expiresIn: '1d' });

    return res.json({
      message: 'User saved successfully',
      success: true,
      data,
      token,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({ error: 'Something went wrong' });
  }
};


exports.getUser = async (req, res) => {
  try {
    const results = await userModel.find({});
    
    if (!results || results.length === 0) {
      throw new NotFoundError('User data not found');
    }

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};




exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a reset token
    const resetToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    // Update the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Invalidate the reset token (optional: mark it as used in the database)

    return res.json({ message: 'Password reset successful', resetToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      throw new ValidationError('Please provide email and password');
    }

    // Find the user by email
    const user = await userModel.findOne({ email });

    // Check if the user exists
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Check if the password is valid
    if (!isPasswordValid) {
      throw new ValidationError('Invalid password');
    }

    // Create JWT token with one day expiry time
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1d' });

    res.json({
      message: 'Login successful',
      success: true,
      data: { user, token },
    });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ success: false, error: error.message });
    }

    console.error('Error in login:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};