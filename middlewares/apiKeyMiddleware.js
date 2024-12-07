// Middleware to validate API key for admin routes
const validateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key']; // Extract API key from the request header
    const validApiKey = process.env.ADMIN_API_KEY; // Predefined API key stored in environment variables
  
    if (!apiKey) {
      return res.status(401).json({ message: 'Access Denied: No API key provided' });
    }
  
    if (apiKey !== validApiKey) {
      return res.status(403).json({ message: 'Access Denied: Invalid API key' });
    }
  
    next(); // Proceed to the next middleware/route if API key is valid
  };
  
  module.exports = { validateApiKey };
  