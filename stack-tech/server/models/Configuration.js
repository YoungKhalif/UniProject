const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: 'My Custom Build'
  },
  components: {
    cpu: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    motherboard: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    ram: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    storage: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    gpu: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    psu: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    case: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
  },
  totalPrice: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Configuration', configurationSchema);