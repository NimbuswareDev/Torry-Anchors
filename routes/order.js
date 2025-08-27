const express = require('express');
const { body, validationResult } = require('express-validator');
const { Order, Cart, Product } = require('../models');
const { auth } = require('../middlewares/auth');

const router = express.Router();

// Create order from cart
router.post('/', [
  auth,
  body('shippingAddress.street').notEmpty().withMessage('Street address is required'),
  body('shippingAddress.city').notEmpty().withMessage('City is required'),
  body('shippingAddress.state').notEmpty().withMessage('State is required'),
  body('shippingAddress.pincode').notEmpty().withMessage('Pincode is required'),
  body('paymentMethod').optional().isIn(['razorpay', 'cod']).withMessage('Invalid payment method')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { shippingAddress, paymentMethod = 'razorpay' } = req.body;

    // Get cart items
    const cartItems = await Cart.find({ userId: req.user._id }).populate('productId');
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Validate stock availability
    for (const item of cartItems) {
      if (!item.productId || item.productId.quantity < item.quantity) {
        return res.status(400).json({ 
          error: `Not enough stock for ${item.productId?.name || 'an item'}` 
        });
      }
    }

    // Calculate total and prepare order items
    const orderItems = cartItems.map(item => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity,
      subtotal: item.productId.price * item.quantity
    }));

    const totalAmount = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

    // Create order
    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: 'pending',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending'
    });

    // Update product quantities
    for (const item of cartItems) {
      const product = item.productId;
      product.quantity -= item.quantity;
      await product.save();
    }

    // Clear cart
    await Cart.deleteMany({ userId: req.user._id });

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        _id: order._id,
        userId: order.userId,
        totalAmount: order.totalAmount,
        status: order.status,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get user orders
router.get('/', auth, async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    const filter = { userId: req.user._id };
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .lean();

    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Failed to get orders' });
  }
});

// Get specific order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    }).populate('items.productId');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Failed to get order' });
  }
});

// Update order status (for retailers/superusers)
router.patch('/:id/status', [
  auth,
  body('status').isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if user has permission to update order status
    if (req.user.role !== 'superuser' && req.user.role !== 'retailer') {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    order.status = status;
    await order.save();

    res.json({
      message: 'Order status updated successfully',
      order: {
        _id: order._id,
        status: order.status
      }
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

module.exports = router;
