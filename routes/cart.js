const express = require('express');
const { body, validationResult } = require('express-validator');
const { Cart, Product } = require('../models');
const { auth } = require('../middlewares/auth');

const router = express.Router();

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.user._id }).populate('productId').lean();

    const mapped = items.map(it => {
      const p = it.productId || {};
      const price = Number(p.price || 0);
      const qty = it.quantity;
      return {
        productId: p._id?.toString(),
        name: p.name,
        quantity: qty,
        price: price,
        subtotal: price * qty,
        image: p.image,
        availableQuantity: p.quantity
      };
    });

    const total = mapped.reduce((sum, item) => sum + item.subtotal, 0);

    res.json({ items: mapped, total });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: 'Failed to get cart' });
  }
});

// Add item to cart
router.post('/add', [
  auth,
  body('productId').notEmpty().withMessage('Valid product ID required'),
  body('quantity').isInt({ min: 1 }).withMessage('Valid quantity required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.quantity < quantity) return res.status(400).json({ error: 'Not enough stock available' });

    const existing = await Cart.findOne({ userId: req.user._id, productId });
    if (existing) {
      const newQuantity = existing.quantity + Number(quantity);
      if (product.quantity < newQuantity) return res.status(400).json({ error: 'Not enough stock available' });
      existing.quantity = newQuantity;
      await existing.save();
      return res.json({ message: 'Item added to cart', cartItem: { productId, quantity: newQuantity } });
    }

    await Cart.create({ userId: req.user._id, productId, quantity });
    res.json({ message: 'Item added to cart', cartItem: { productId, quantity } });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Remove item from cart
router.post('/remove', [
  auth,
  body('productId').notEmpty().withMessage('Valid product ID required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId } = req.body;
    const doc = await Cart.findOne({ userId: req.user._id, productId });
    if (!doc) return res.status(404).json({ error: 'Item not found in cart' });
    await doc.deleteOne();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

// Update cart item quantity
router.patch('/update', [
  auth,
  body('productId').notEmpty().withMessage('Valid product ID required'),
  body('quantity').isInt({ min: 1 }).withMessage('Valid quantity required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.quantity < quantity) return res.status(400).json({ error: 'Not enough stock available' });

    const doc = await Cart.findOne({ userId: req.user._id, productId });
    if (!doc) return res.status(404).json({ error: 'Item not found in cart' });

    doc.quantity = Number(quantity);
    await doc.save();

    res.json({ message: 'Cart item updated', cartItem: { productId, quantity } });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// Buy cart items (deprecated - use /api/orders instead)
router.post('/buy', [
  auth,
  body('shippingAddress').notEmpty().withMessage('Shipping address required'),
  body('paymentMethod').optional().isIn(['razorpay', 'cod']).withMessage('Invalid payment method')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { shippingAddress, paymentMethod = 'razorpay' } = req.body;

    // Parse shipping address if it's a string
    let parsedAddress;
    if (typeof shippingAddress === 'string') {
      parsedAddress = {
        street: shippingAddress,
        city: 'Unknown',
        state: 'Unknown',
        pincode: '000000'
      };
    } else {
      parsedAddress = shippingAddress;
    }

    // Get cart items
    const cartItems = await Cart.find({ userId: req.user._id }).populate('productId');
    if (cartItems.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    for (const item of cartItems) {
      if (!item.productId || item.productId.quantity < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for ${item.productId?.name || 'an item'}` });
      }
    }

    const total = cartItems.reduce((sum, item) => sum + (Number(item.productId.price) * item.quantity), 0);

    // Create order items
    const orderItems = cartItems.map(item => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity,
      subtotal: item.productId.price * item.quantity
    }));

    // Create order using Order model
    const { Order } = require('../models');
    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      totalAmount: total,
      shippingAddress: parsedAddress,
      paymentMethod,
      status: 'pending',
      paymentStatus: 'pending'
    });

    // Update product quantities
    for (const item of cartItems) {
      const p = item.productId;
      p.quantity = p.quantity - item.quantity;
      await p.save();
    }

    await Cart.deleteMany({ userId: req.user._id });

    res.json({ 
      message: 'Order placed successfully', 
      orderId: order._id.toString(), 
      total, 
      items: cartItems.length 
    });
  } catch (error) {
    console.error('Buy cart error:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

module.exports = router; 