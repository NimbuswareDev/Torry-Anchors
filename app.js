const express = require('express');
const dotenv = require('dotenv');
const connectMongo = require('./config/mongo');
const { ensureSuperuser } = require('./models');
const logger = require('./middlewares/logger');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middlewares/errorHandler');
const emailService = require('./services/emailService');

// Load env vars
dotenv.config();

const app = express();
app.use(express.json());

// Logger
app.use(logger);
// CORS
app.use(cors());
// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}));

// Connect to MongoDB
connectMongo(process.env.MONGO_URI)
  .then(async () => {
    await ensureSuperuser();
    // Verify email service configuration
    await emailService.verifyEmailConfiguration();
  })
  .catch(err => {
    console.log('Mongo connection failed: ' + err.message);
  });

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
// Use mock payment routes instead of real payment routes
const mockPaymentRoutes = require('./routes/mockPayment');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', mockPaymentRoutes);

// Log available routes
console.log('Available API endpoints:');
console.log('- POST   /api/auth/login');
console.log('- POST   /api/auth/register');
console.log('- POST   /api/auth/verify-register');
console.log('- POST   /api/auth/verify-login');
console.log('- GET    /api/auth/profile');
console.log('- PUT    /api/auth/profile');
console.log('- GET    /api/products');
console.log('- POST   /api/products (retailer only)');
console.log('- PUT    /api/products/:id (retailer only)');
console.log('- DELETE /api/products/:id (retailer only)');
console.log('- PATCH  /api/products/:id/quantity (retailer only)');
console.log('- GET    /api/cart');
console.log('- POST   /api/cart/add');
console.log('- POST   /api/cart/remove');
console.log('- PATCH  /api/cart/update');
console.log('- POST   /api/cart/buy (deprecated)');
console.log('- POST   /api/orders');
console.log('- GET    /api/orders');
console.log('- GET    /api/orders/:id');
console.log('- PATCH  /api/orders/:id/status (retailer/superuser only)');
console.log('- POST   /api/payment/create-order');
console.log('- POST   /api/payment/verify');

// TODO: Add routes here

// Error handler (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));