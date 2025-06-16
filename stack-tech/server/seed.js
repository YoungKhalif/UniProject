require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
  // Pre-built systems
  {
    name: "Stellar Gaming Pro",
    type: "prebuilt",
    price: 1499.99,
    description: "High-performance gaming PC ready for 1440p gaming",
    images: ["stellar-pro.jpg"],
    specs: {
      processorBrand: "AMD",
      processorModel: "Ryzen 7 5800X",
      gpuModel: "RTX 3070",
      ramSize: "32",
      storageType: "SSD",
      storageSize: "1TB",
      performanceScore: 92
    },
    stock: 15
  },
  {
    name: "Nova Gaming Elite",
    type: "prebuilt",
    price: 2299.99,
    description: "Premium gaming rig for 4K gaming and streaming",
    images: ["nova-elite.jpg"],
    specs: {
      processorBrand: "Intel",
      processorModel: "Core i9-12900K",
      gpuModel: "RTX 4080",
      ramSize: "32",
      storageType: "NVMe SSD",
      storageSize: "2TB",
      performanceScore: 98
    },
    stock: 8
  },
  
  // Components
  {
    category: "CPU",
    name: "AMD Ryzen 7 5800X",
    price: 299.99,
    specs: {
      brand: "AMD",
      model: "Ryzen 7 5800X",
      cores: 8,
      threads: 16,
      socket: "AM4",
      tdp: 105
    },
    compatibility: ["AM4 motherboards"]
  },
  {
    category: "Motherboard",
    name: "ASUS ROG Strix B550-F",
    price: 189.99,
    specs: {
      brand: "ASUS",
      model: "ROG Strix B550-F",
      socket: "AM4",
      formFactor: "ATX",
      memoryType: "DDR4"
    }
  },
  // Add more components as needed
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert sample data
    await Product.insertMany(sampleProducts);
    console.log('Database seeded successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();