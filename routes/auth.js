const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { User } = require('../models');
const { auth } = require('../middlewares/auth');

const router = express.Router();

// Mock OTP storage (in production, use Redis or database)
const otpStore = new Map();

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Mock SMS sending (in production, integrate with Twilio)
const sendSMS = async (phone, message) => {
  console.log(`SMS to ${phone}: ${message}`);
  return true;
};

// Register new user
router.post('/register', [
  body('phone').isMobilePhone().withMessage('Valid phone number required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this phone number' });
    }

    // Generate and store OTP
    const otp = generateOTP();
    otpStore.set(phone, { otp, timestamp: Date.now() });

    // Send OTP via SMS
    await sendSMS(phone, `Your OTP for TorryAnchor registration is: ${otp}`);

    res.status(201).json({
      message: 'OTP sent to your phone. Please verify OTP to complete registration.'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Verify registration OTP
router.post('/verify-register', [
  body('phone').isMobilePhone().withMessage('Valid phone number required'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone, otp } = req.body;

    // Check if OTP exists and is valid
    const storedOTP = otpStore.get(phone);
    if (!storedOTP || storedOTP.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Check if OTP is expired (5 minutes)
    if (Date.now() - storedOTP.timestamp > 5 * 60 * 1000) {
      otpStore.delete(phone);
      return res.status(400).json({ error: 'OTP expired' });
    }

    // Create user (password should be sent in the initial registration)
    const user = await User.create({
      phone,
      password: req.body.password, // This should be sent from frontend
      role: 'consumer',
      isVerified: true
    });

    // Clear OTP
    otpStore.delete(phone);

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
  body('phone').isMobilePhone().withMessage('Valid phone number required'),
  body('password').notEmpty().withMessage('Password required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone, password } = req.body;

    // Find user
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ error: 'Invalid phone number or password' });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid phone number or password' });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({ error: 'Account not verified. Please verify your account first.' });
    }

    // Generate OTP for login
    const otp = generateOTP();
    otpStore.set(phone, { otp, timestamp: Date.now(), isLogin: true });

    // Send OTP via SMS
    await sendSMS(phone, `Your OTP for TorryAnchor login is: ${otp}`);

    res.json({
      message: 'OTP sent. Please provide the OTP to complete login.',
      requiresOTP: true
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Verify login OTP
router.post('/verify-login', [
  body('phone').isMobilePhone().withMessage('Valid phone number required'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone, otp } = req.body;

    // Check if OTP exists and is valid
    const storedOTP = otpStore.get(phone);
    if (!storedOTP || storedOTP.otp !== otp || !storedOTP.isLogin) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Check if OTP is expired (5 minutes)
    if (Date.now() - storedOTP.timestamp > 5 * 60 * 1000) {
      otpStore.delete(phone);
      return res.status(400).json({ error: 'OTP expired' });
    }

    // Find user
    const user = await User.findOne({ phone });
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
    otpStore.delete(phone);

    res.json({
      token,
      user: {
        id: user._id.toString(),
        phone: user.phone,
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
      phone: u.phone,
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
      id: req.user._id.toString(), phone: req.user.phone, role: req.user.role,
      address: req.user.address, city: req.user.city, state: req.user.state, pincode: req.user.pincode
    }});
  } catch (e) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router; 