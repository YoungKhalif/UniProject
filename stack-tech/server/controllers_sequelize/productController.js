// controllers_sequelize/productController.js
const { Product } = require('../models_sequelize');

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    
    const updatedProduct = await Product.findByPk(req.params.id);
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id }
    });
    
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { category: req.params.category }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const { term } = req.query;
    const { Op } = require('sequelize');
    
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${term}%` } },
          { brand: { [Op.iLike]: `%${term}%` } },
          { model: { [Op.iLike]: `%${term}%` } }
        ]
      }
    });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
