const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', index: true, required: true },
  quantity: { type: Number, min: 1, default: 1, required: true }
}, { timestamps: true });

CartSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('Cart', CartSchema);