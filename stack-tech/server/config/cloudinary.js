const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || 'demo',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'demo'
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'stack-tech-products',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'gif'],
    transformation: [
      { width: 800, height: 600, crop: 'limit' },
      { quality: 'auto' }
    ]
  }
});

// Configure local storage as fallback
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = require('path');
    const fs = require('fs');
    const uploadPath = path.join(__dirname, '../public/uploads');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for image validation
const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

// Use Cloudinary if credentials are available, otherwise use local storage
const useCloudinary = process.env.CLOUDINARY_CLOUD_NAME && 
                     process.env.CLOUDINARY_API_KEY && 
                     process.env.CLOUDINARY_API_SECRET &&
                     process.env.CLOUDINARY_CLOUD_NAME !== 'demo';

const upload = multer({
  storage: useCloudinary ? storage : localStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = { 
  upload, 
  cloudinary, 
  useCloudinary 
};
