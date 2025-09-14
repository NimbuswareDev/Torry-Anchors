const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');
const Order = require('./Order');

// Function to ensure superuser exists
const ensureSuperuser = async () => {
  try {
    const superuser = await User.findOne({ role: 'superuser' }).lean();
    if (!superuser) {
      await User.create({
        email: 'admin@torryanchor.com',
        password: 'password', // hashed by pre-save hook
        role: 'superuser',
        isVerified: true
      });
      console.log('Superuser created');
    }
  } catch (error) {
    console.error('Error creating superuser:', error);
  }
};

module.exports = {
  User,
  Product,
  Cart,
  Order,
  ensureSuperuser
};