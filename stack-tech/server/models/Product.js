const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  category: { type: String, required: true, enum: ['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'PSU', 'Case', 'Cooling'] },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  specs: {
    brand: String,
    model: String,
    socket: String,
    formFactor: String,
    memoryType: String,
    capacity: String,
    wattage: Number,
    // Add more specs as needed
  },
  compatibility: [String],
  stock: { type: Number, default: 0 }
}, { timestamps: true });

const Product = mongoose.model('Product', componentSchema);

module.exports = Product;