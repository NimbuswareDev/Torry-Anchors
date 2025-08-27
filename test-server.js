const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Auth test route
app.post('/api/auth/login', (req, res) => {
  console.log('Login attempt:', req.body);
  res.json({ 
    message: 'OTP sent. Please provide the OTP to complete login.',
    requiresOTP: true 
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET  /api/test');
  console.log('- POST /api/auth/login');
}); 