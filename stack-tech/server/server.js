require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const configRoutes = require('./routes/configs');
const adminRoutes = require('./routes/adminRoutes');

const authMiddleware = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


// Add after mongoose connection
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', authMiddleware, require('./routes/users'));
app.use('/api/admin', adminRoutes); // Admin routes
app.use('/api/configs', authMiddleware, require('./routes/configs'));
// Add middleware for authentication
app.use('/api/products', authMiddleware, require('./routes/products'));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/configs', configRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));