const express = require('express');
const { body, validationResult } = require('express-validator');
const { Product } = require('../models');
const { auth, requireRole } = require('../middlewares/auth');

const router = express.Router();

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const docs = await Product.find({}).sort({ createdAt: -1 }).lean();
    const products = docs.map(p => ({ ...p, id: p._id, _id: undefined }));
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Failed to get products' });
  }
});

// Add new product (retailer only)
router.post('/', [
  auth,
  requireRole(['retailer', 'superuser']),
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('quantity').isInt({ min: 0 }).withMessage('Valid quantity is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price, quantity, area, category, image } = req.body;

    const product = await Product.create({
      name, description, price, quantity, area, category, image, retailerId: req.user._id
    });

    const obj = product.toObject();
    res.status(201).json({ ...obj, id: obj._id, _id: undefined });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Update product (retailer only)
router.put('/:id', [
  auth,
  requireRole(['retailer', 'superuser']),
  body('name').optional().notEmpty().withMessage('Product name cannot be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('quantity').optional().isInt({ min: 0 }).withMessage('Valid quantity is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const isOwner = product.retailerId?.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'superuser') return res.status(403).json({ error: 'Not authorized to update this product' });

    Object.assign(product, req.body);
    await product.save();

    res.json({
      message: 'Product updated successfully',
      product: { id: product._id, name: product.name, price: product.price, quantity: product.quantity }
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product (retailer only)
router.delete('/:id', [
  auth,
  requireRole(['retailer', 'superuser'])
], async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const isOwner = product.retailerId?.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'superuser') return res.status(403).json({ error: 'Not authorized to delete this product' });

    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Update product quantity
router.patch('/:id/quantity', [
  auth,
  requireRole(['retailer', 'superuser']),
  body('change').isInt().withMessage('Quantity change must be an integer')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { change } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const isOwner = product.retailerId?.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'superuser') return res.status(403).json({ error: 'Not authorized to update this product' });

    const newQuantity = product.quantity + Number(change);
    if (newQuantity < 0) return res.status(400).json({ error: 'Quantity cannot be negative' });

    product.quantity = newQuantity;
    await product.save();

    res.json({
      message: 'Quantity updated successfully',
      product: { id: product._id, name: product.name, quantity: newQuantity }
    });
  } catch (error) {
    console.error('Update quantity error:', error);
    res.status(500).json({ error: 'Failed to update quantity' });
  }
});

module.exports = router; 