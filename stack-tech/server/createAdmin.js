const { User } = require('./models_sequelize');
const sequelize = require('./database/connection');

const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({
      where: {
        email: 'admin@stacktech.com'
      }
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      firstName: 'Admin',
      lastName: 'User',
      username: 'admin',
      email: 'admin@stacktech.com',
      password: 'Admin123!', // This will be hashed automatically by the User model hooks
      role: 'admin'
    });

    console.log('Admin user created successfully');
    console.log('Email: admin@stacktech.com');
    console.log('Password: Admin123!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

// Initialize database connection and create admin
sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');
    createAdminUser();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });
