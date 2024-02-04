const jwt = require('jsonwebtoken');

let secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const tokenHeader = req.header('Authorization');

  if (!tokenHeader) {
    return res.status(401).json({ error: 'Access denied. Token not provided.' });
  }

  // Remove the "Bearer " prefix from the tokenHeader
  const token = tokenHeader.replace('Bearer ', '');
  console.log(token);

  try {
    const decoded = jwt.verify(token, secretKey); // Verify the token using your secret key
    req.userId = decoded.userId; // Add the user ID to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error(error);

    // Check if the error is due to token expiration
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired.' });
    }

    return res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = verifyToken;
