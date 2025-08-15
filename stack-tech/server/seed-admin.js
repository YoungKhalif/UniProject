require('dotenv').config();
const { User, Product, Order, OrderItem, sequelize } = require('./models_sequelize');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  try {
    console.log('🔄 Starting database seeding...');
    
    // Force sync database (WARNING: This will drop all tables)
    await sequelize.sync({ force: true });
    console.log('✅ Database synced');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      firstName: 'Admin',
      lastName: 'User',
      username: 'admin',
      email: 'admin@stacktech.com',
      phoneNumber: '+1-555-0001',
      password: adminPassword,
      role: 'admin',
      isActive: true,
      isEmailVerified: true
    });
    console.log('✅ Admin user created');

    // Create regular users
    const users = [];
    for (let i = 1; i <= 10; i++) {
      const userPassword = await bcrypt.hash('password123', 10);
      const user = await User.create({
        name: `User ${i}`,
        firstName: `FirstName${i}`,
        lastName: `LastName${i}`,
        username: `user${i}`,
        email: `user${i}@example.com`,
        phoneNumber: `+1-555-000${i}`,
        password: userPassword,
        role: 'user',
        isActive: i % 7 !== 0, // Make some users inactive
        isEmailVerified: true
      });
      users.push(user);
    }
    console.log('✅ Regular users created');

    // Create products
    const products = await Product.bulkCreate([
      // CPUs
      {
        category: 'CPU',
        name: 'Intel Core i9-13900K',
        price: 589.99,
        brand: 'Intel',
        model: 'i9-13900K',
        socket: 'LGA1700',
        stock: 25,
        image: '/images/cpu-intel-i9.jpg'
      },
      {
        category: 'CPU',
        name: 'AMD Ryzen 9 7950X',
        price: 699.99,
        brand: 'AMD',
        model: '7950X',
        socket: 'AM5',
        stock: 18,
        image: '/images/cpu-amd-7950x.jpg'
      },
      {
        category: 'CPU',
        name: 'Intel Core i7-13700K',
        price: 409.99,
        brand: 'Intel',
        model: 'i7-13700K',
        socket: 'LGA1700',
        stock: 35,
        image: '/images/cpu-intel-i7.jpg'
      },
      {
        category: 'CPU',
        name: 'AMD Ryzen 7 7800X3D',
        price: 449.99,
        brand: 'AMD',
        model: '7800X3D',
        socket: 'AM5',
        stock: 12,
        image: '/images/cpu-amd-7800x3d.jpg'
      },
      
      // GPUs
      {
        category: 'GPU',
        name: 'NVIDIA RTX 4090',
        price: 1599.99,
        brand: 'NVIDIA',
        model: 'RTX 4090',
        stock: 8,
        image: '/images/gpu-rtx-4090.jpg'
      },
      {
        category: 'GPU',
        name: 'NVIDIA RTX 4080',
        price: 1199.99,
        brand: 'NVIDIA',
        model: 'RTX 4080',
        stock: 15,
        image: '/images/gpu-rtx-4080.jpg'
      },
      {
        category: 'GPU',
        name: 'AMD RX 7900 XTX',
        price: 999.99,
        brand: 'AMD',
        model: 'RX 7900 XTX',
        stock: 12,
        image: '/images/gpu-rx-7900xtx.jpg'
      },
      {
        category: 'GPU',
        name: 'NVIDIA RTX 4070',
        price: 599.99,
        brand: 'NVIDIA',
        model: 'RTX 4070',
        stock: 22,
        image: '/images/gpu-rtx-4070.jpg'
      },
      
      // Motherboards
      {
        category: 'Motherboard',
        name: 'ASUS ROG Strix Z790-E',
        price: 449.99,
        brand: 'ASUS',
        model: 'ROG Strix Z790-E',
        socket: 'LGA1700',
        formFactor: 'ATX',
        stock: 20,
        image: '/images/mb-asus-z790.jpg'
      },
      {
        category: 'Motherboard',
        name: 'MSI MPG X670E Carbon',
        price: 429.99,
        brand: 'MSI',
        model: 'MPG X670E Carbon',
        socket: 'AM5',
        formFactor: 'ATX',
        stock: 16,
        image: '/images/mb-msi-x670e.jpg'
      },
      
      // RAM
      {
        category: 'RAM',
        name: 'Corsair Vengeance DDR5-5600 32GB',
        price: 199.99,
        brand: 'Corsair',
        model: 'Vengeance DDR5-5600',
        memoryType: 'DDR5',
        capacity: '32GB',
        stock: 45,
        image: '/images/ram-corsair-32gb.jpg'
      },
      {
        category: 'RAM',
        name: 'G.Skill Trident Z5 DDR5-6000 32GB',
        price: 229.99,
        brand: 'G.Skill',
        model: 'Trident Z5 DDR5-6000',
        memoryType: 'DDR5',
        capacity: '32GB',
        stock: 28,
        image: '/images/ram-gskill-32gb.jpg'
      },
      {
        category: 'RAM',
        name: 'Corsair Vengeance DDR5-5600 16GB',
        price: 109.99,
        brand: 'Corsair',
        model: 'Vengeance DDR5-5600',
        memoryType: 'DDR5',
        capacity: '16GB',
        stock: 65,
        image: '/images/ram-corsair-16gb.jpg'
      },
      
      // Storage
      {
        category: 'Storage',
        name: 'Samsung 980 PRO 2TB NVMe',
        price: 179.99,
        brand: 'Samsung',
        model: '980 PRO',
        capacity: '2TB',
        stock: 32,
        image: '/images/storage-samsung-2tb.jpg'
      },
      {
        category: 'Storage',
        name: 'WD Black SN850X 1TB NVMe',
        price: 89.99,
        brand: 'Western Digital',
        model: 'SN850X',
        capacity: '1TB',
        stock: 48,
        image: '/images/storage-wd-1tb.jpg'
      },
      {
        category: 'Storage',
        name: 'Samsung 980 PRO 1TB NVMe',
        price: 99.99,
        brand: 'Samsung',
        model: '980 PRO',
        capacity: '1TB',
        stock: 5, // Low stock for testing alerts
        image: '/images/storage-samsung-1tb.jpg'
      },
      
      // PSUs
      {
        category: 'PSU',
        name: 'Corsair RM850x 850W 80+ Gold',
        price: 149.99,
        brand: 'Corsair',
        model: 'RM850x',
        wattage: 850,
        stock: 25,
        image: '/images/psu-corsair-850w.jpg'
      },
      {
        category: 'PSU',
        name: 'EVGA SuperNOVA 1000W 80+ Platinum',
        price: 199.99,
        brand: 'EVGA',
        model: 'SuperNOVA 1000W',
        wattage: 1000,
        stock: 18,
        image: '/images/psu-evga-1000w.jpg'
      },
      
      // Cases
      {
        category: 'Case',
        name: 'Fractal Design Define 7',
        price: 179.99,
        brand: 'Fractal Design',
        model: 'Define 7',
        formFactor: 'ATX',
        stock: 22,
        image: '/images/case-fractal-define7.jpg'
      },
      {
        category: 'Case',
        name: 'Lian Li PC-O11 Dynamic',
        price: 139.99,
        brand: 'Lian Li',
        model: 'PC-O11 Dynamic',
        formFactor: 'ATX',
        stock: 19,
        image: '/images/case-lianli-o11.jpg'
      }
    ]);
    console.log('✅ Products created');

    // Create orders
    const orders = [];
    for (let i = 0; i < 25; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      // Generate random date in the last 30 days
      const randomDate = new Date();
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));
      
      const order = await Order.create({
        userId: randomUser.id,
        totalAmount: Math.random() * 3000 + 500, // Random amount between 500-3500
        street: `${Math.floor(Math.random() * 9999)} Main St`,
        city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)],
        state: ['NY', 'CA', 'IL', 'TX', 'AZ'][Math.floor(Math.random() * 5)],
        zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
        country: 'USA',
        status: randomStatus,
        paymentMethod: ['credit_card', 'paypal', 'bank_transfer'][Math.floor(Math.random() * 3)],
        paymentStatus: randomStatus === 'delivered' ? 'completed' : 'pending',
        trackingNumber: randomStatus === 'shipped' || randomStatus === 'delivered' ? `TRK${Date.now()}${i}` : null,
        createdAt: randomDate,
        updatedAt: randomDate
      });
      
      // Add random order items
      const numItems = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < numItems; j++) {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        await OrderItem.create({
          orderId: order.id,
          productId: randomProduct.id,
          quantity: Math.floor(Math.random() * 2) + 1,
          price: randomProduct.price
        });
      }
      
      orders.push(order);
    }
    console.log('✅ Orders and order items created');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`👤 Users: ${users.length + 1} (including 1 admin)`);
    console.log(`🛍️ Products: ${products.length}`);
    console.log(`📦 Orders: ${orders.length}`);
    console.log('\n🔑 Admin Login:');
    console.log('Email: admin@stacktech.com');
    console.log('Password: admin123');
    console.log('\n🌐 Frontend: http://localhost:5173');
    console.log('🔗 Backend: http://localhost:5000');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

// Run the seeding
seedDatabase();
