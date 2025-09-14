const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { User } = require('../models');
const { auth } = require('../middlewares/auth');
const emailService = require('../services/emailService');

const router = express.Router();

// OTP storage (in production, use Redis or database)
const otpStore = new Map();

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Register new user
router.post('/register', [
  body('email').isEmail().withMessage('Valid email address required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email address' });
    }

    // Generate and store OTP
    const otp = generateOTP();
    otpStore.set(email, { otp, timestamp: Date.now() });

    // Send OTP via email
    const emailResult = await emailService.sendOTPEmail(email, otp, 'registration');
    
    if (!emailResult.success) {
      return res.status(500).json({ error: 'Failed to send verification email' });
    }

    res.status(201).json({
      message: 'OTP sent to your email. Please verify OTP to complete registration.'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Verify registration OTP
router.post('/verify-register', [
  body('email').isEmail().withMessage('Valid email address required'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, otp, password } = req.body;

    // Check if OTP exists and is valid
    const storedOTP = otpStore.get(email);
    if (!storedOTP || storedOTP.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Check if OTP is expired (5 minutes)
    if (Date.now() - storedOTP.timestamp > 5 * 60 * 1000) {
      otpStore.delete(email);
      return res.status(400).json({ error: 'OTP expired' });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      role: 'consumer',
      isVerified: true
    });

    // Clear OTP
    otpStore.delete(email);

    res.json({
      message: 'Registration verified. You can now login.'
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ error: 'OTP verification failed' });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Valid email address required'),
  body('password').notEmpty().withMessage('Password required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({ error: 'Account not verified. Please verify your account first.' });
    }

    // Generate OTP for login
    const otp = generateOTP();
    otpStore.set(email, { otp, timestamp: Date.now(), isLogin: true });

    // Send OTP via email
    const emailResult = await emailService.sendOTPEmail(email, otp, 'login');
    
    if (!emailResult.success) {
      return res.status(500).json({ error: 'Failed to send verification email' });
    }

    res.json({
      message: 'OTP sent to your email. Please provide the OTP to complete login.',
      requiresOTP: true
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Verify login OTP
router.post('/verify-login', [
  body('email').isEmail().withMessage('Valid email address required'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, otp } = req.body;

    // Check if OTP exists and is valid
    const storedOTP = otpStore.get(email);
    if (!storedOTP || storedOTP.otp !== otp || !storedOTP.isLogin) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Check if OTP is expired (5 minutes)
    if (Date.now() - storedOTP.timestamp > 5 * 60 * 1000) {
      otpStore.delete(email);
      return res.status(400).json({ error: 'OTP expired' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
      { expiresIn: '7d' }
    );

    // Clear OTP
    otpStore.delete(email);

    res.json({
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login verification error:', error);
    res.status(500).json({ error: 'Login verification failed' });
  }
});

// Get current user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const u = req.user;
    res.json({
      id: u._id.toString(),
      email: u.email,
      role: u.role,
      isVerified: u.isVerified,
      address: u.address,
      city: u.city,
      state: u.state,
      pincode: u.pincode
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// Update profile
router.put('/profile', auth, async (req, res) => {
  try {
    const fields = ['address','city','state','pincode'];
    for (const f of fields) if (req.body[f] !== undefined) req.user[f] = req.body[f];
    await req.user.save();
    res.json({ message: 'Profile updated', user: {
      id: req.user._id.toString(), email: req.user.email, role: req.user.role,
      address: req.user.address, city: req.user.city, state: req.user.state, pincode: req.user.pincode
    }});
  } catch (e) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router; 