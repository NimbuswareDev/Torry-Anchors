const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0, default: 0 },
  area: { type: String },
  category: { type: String, enum: ['freshwater', 'seawater', 'prawns_crabs', 'chicken_mutton'] },
  image: { type: String },
  imageUrl: { type: String }, // Added for PostgreSQL compatibility
  retailerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);