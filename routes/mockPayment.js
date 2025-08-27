const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth } = require('../middlewares/auth');

const router = express.Router();

// Create payment order
router.post('/create-order', [
  auth,
  body('amount').isFloat({ min: 1 }).withMessage('Valid amount required'),
  body('currency').optional().isIn(['INR', 'USD']).withMessage('Valid currency required'),
  body('receipt').optional().isString().withMessage('Valid receipt required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, currency = 'INR', receipt } = req.body;

    // Generate mock payment order
    const orderId = `order_${Date.now()}_${req.user.id}`;
    const paymentId = `pay_${Date.now()}_${req.user.id}`;

    res.json({
      id: paymentId,
      entity: 'order',
      amount: amount * 100, // Convert to paise
      amount_paid: 0,
      amount_due: amount * 100,
      currency: currency,
      receipt: receipt || orderId,
      status: 'created',
      attempts: 0,
      notes: [],
      created_at: Date.now()
    });
  } catch (error) {
    console.error('Create payment order error:', error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

// Verify payment
router.post('/verify', [
  auth,
  body('razorpay_payment_id').notEmpty().withMessage('Payment ID required'),
  body('razorpay_order_id').notEmpty().withMessage('Order ID required'),
  body('razorpay_signature').notEmpty().withMessage('Signature required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    // Mock payment verification (in production, verify with Razorpay)
    const isValidPayment = true; // Mock verification

    if (isValidPayment) {
      res.json({
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        status: 'success'
      });
    } else {
      res.status(400).json({
        error: 'Payment verification failed',
        status: 'failed'
      });
    }
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

module.exports = router; 