require('dotenv').config();
const sequelize = require('./database/connection');
const { User, Product } = require('./models_sequelize');
const bcrypt = require('bcryptjs');

// Sample products data
const products = [
  // CPUs
  {
    category: 'CPU',
    name: 'Intel Core i9-13900K',
    price: 599.99,
    image: '/images/cpu/i9-13900k.jpg',
    brand: 'Intel',
    model: 'Core i9-13900K',
    socket: 'LGA1700',
    stock: 25
  },
  {
    category: 'CPU',
    name: 'AMD Ryzen 9 7950X',
    price: 699.99,
    image: '/images/cpu/ryzen9-7950x.jpg',
    brand: 'AMD',
    model: 'Ryzen 9 7950X',
    socket: 'AM5',
    stock: 20
  },
  // GPUs
  {
    category: 'GPU',
    name: 'NVIDIA GeForce RTX 4090',
    price: 1599.99,
    image: '/images/gpu/rtx4090.jpg',
    brand: 'NVIDIA',
    model: 'GeForce RTX 4090',
    stock: 15
  },
  {
    category: 'GPU',
    name: 'AMD Radeon RX 7900 XTX',
    price: 999.99,
    image: '/images/gpu/rx7900xtx.jpg',
    brand: 'AMD',
    model: 'Radeon RX 7900 XTX',
    stock: 18
  },
  // Motherboards
  {
    category: 'Motherboard',
    name: 'ASUS ROG Maximus Z790 Hero',
    price: 599.99,
    image: '/images/motherboard/asus-z790.jpg',
    brand: 'ASUS',
    model: 'ROG Maximus Z790 Hero',
    socket: 'LGA1700',
    formFactor: 'ATX',
    stock: 10
  },
  {
    category: 'Motherboard',
    name: 'MSI MEG X670E GODLIKE',
    price: 699.99,
    image: '/images/motherboard/msi-x670e.jpg',
    brand: 'MSI',
    model: 'MEG X670E GODLIKE',
    socket: 'AM5',
    formFactor: 'E-ATX',
    stock: 8
  },
  // RAM
  {
    category: 'RAM',
    name: 'Corsair Vengeance RGB DDR5 32GB',
    price: 219.99,
    image: '/images/ram/corsair-ddr5.jpg',
    brand: 'Corsair',
    model: 'Vengeance RGB',
    memoryType: 'DDR5',
    capacity: '32GB (2 x 16GB)',
    stock: 30
  },
  {
    category: 'RAM',
    name: 'G.Skill Trident Z5 RGB DDR5 64GB',
    price: 389.99,
    image: '/images/ram/gskill-ddr5.jpg',
    brand: 'G.Skill',
    model: 'Trident Z5 RGB',
    memoryType: 'DDR5',
    capacity: '64GB (2 x 32GB)',
    stock: 15
  },
  // Storage
  {
    category: 'Storage',
    name: 'Samsung 990 PRO 2TB NVMe SSD',
    price: 249.99,
    image: '/images/storage/samsung-990pro.jpg',
    brand: 'Samsung',
    model: '990 PRO',
    capacity: '2TB',
    stock: 40
  },
  {
    category: 'Storage',
    name: 'WD_BLACK SN850X 4TB NVMe SSD',
    price: 399.99,
    image: '/images/storage/wd-sn850x.jpg',
    brand: 'Western Digital',
    model: 'WD_BLACK SN850X',
    capacity: '4TB',
    stock: 25
  },
  // PSU
  {
    category: 'PSU',
    name: 'Corsair HX1000i 1000W Platinum',
    price: 239.99,
    image: '/images/psu/corsair-hx1000i.jpg',
    brand: 'Corsair',
    model: 'HX1000i',
    wattage: 1000,
    stock: 20
  },
  {
    category: 'PSU',
    name: 'EVGA SuperNOVA 1600 T2 1600W Titanium',
    price: 449.99,
    image: '/images/psu/evga-1600t2.jpg',
    brand: 'EVGA',
    model: 'SuperNOVA 1600 T2',
    wattage: 1600,
    stock: 12
  },
  // Cases
  {
    category: 'Case',
    name: 'Lian Li O11 Dynamic EVO',
    price: 189.99,
    image: '/images/case/lianli-o11.jpg',
    brand: 'Lian Li',
    model: 'O11 Dynamic EVO',
    formFactor: 'Mid Tower',
    stock: 15
  },
  {
    category: 'Case',
    name: 'Fractal Design Meshify 2 XL',
    price: 229.99,
    image: '/images/case/fractal-meshify2xl.jpg',
    brand: 'Fractal Design',
    model: 'Meshify 2 XL',
    formFactor: 'Full Tower',
    stock: 10
  },
  // Cooling
  {
    category: 'Cooling',
    name: 'NZXT Kraken Z73 RGB 360mm AIO',
    price: 299.99,
    image: '/images/cooling/nzxt-z73.jpg',
    brand: 'NZXT',
    model: 'Kraken Z73 RGB',
    stock: 8
  },
  {
    category: 'Cooling',
    name: 'Noctua NH-D15 chromax.black',
    price: 109.99,
    image: '/images/cooling/noctua-nhd15.jpg',
    brand: 'Noctua',
    model: 'NH-D15 chromax.black',
    stock: 20
  }
];

// Create admin user
const adminUser = {
  name: 'Admin User',
  firstName: 'Admin',
  lastName: 'User',
  username: 'admin',
  email: 'admin@stacktech.com',
  password: 'Admin123!',
  role: 'admin'
};

// Initialize database
async function initDB() {
  try {
    // Sync database models
    await sequelize.sync({ force: true }); // Use with caution, this drops all tables
    
    console.log('Database synchronized');
    
    // Create admin user
    const admin = await User.create(adminUser);
    console.log('Admin user created:', admin.email);
    
    // Create products
    const createdProducts = await Product.bulkCreate(products);
    console.log(`${createdProducts.length} products created`);
    
    console.log('Database initialization complete');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
}

// Run initialization
initDB();
