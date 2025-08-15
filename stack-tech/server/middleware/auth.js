const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Check for token in various locations
  const token = req.header('x-auth-token') || 
                req.query.token || 
                (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? 
                  req.headers.authorization.split(' ')[1] : null);
  
  console.log('Auth middleware - token:', token ? 'Present' : 'Missing');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Check if JWT_SECRET is set
  if (!process.env.JWT_SECRET) {
    console.error('CRITICAL ERROR: JWT_SECRET is not defined in environment variables');
    return res.status(500).json({ msg: 'Server authentication configuration error' });
  }

  // Verify token
  try {
    console.log('Verifying token with JWT_SECRET');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check token payload structure
    if (!decoded.user || !decoded.user.id) {
      console.error('Invalid token structure - missing user or user.id');
      return res.status(401).json({ msg: 'Invalid token structure' });
    }
    
    console.log('Token decoded successfully. User ID:', decoded.user.id, 'Role:', decoded.user.role || 'not specified');
    
    // Add user data to request
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    
    // Return specific error messages based on error type
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ msg: 'Token has expired', error: 'expired' });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ msg: 'Invalid token', error: 'invalid' });
    }
    
    res.status(401).json({ msg: 'Authentication failed', error: err.message });
  }
};
