require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models_sequelize');

const authMiddleware = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (for uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// PostgreSQL Connection
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL connection has been established successfully');
    return sequelize.sync({ alter: true }); // Use { force: true } during development only
  })
  .then(() => console.log('Database synchronized'))
  .catch(err => console.error('Unable to connect to the database:', err));


// Routes
app.use('/api/auth', require('./routes_sequelize/auth'));
app.use('/api/products', require('./routes_sequelize/products'));
app.use('/api/orders', require('./routes_sequelize/orders'));
app.use('/api/configs', require('./routes_sequelize/configs'));
app.use('/api/admin', require('./routes_sequelize/adminRoutes'));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));