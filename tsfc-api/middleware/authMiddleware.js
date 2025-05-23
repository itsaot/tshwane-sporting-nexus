const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  next();
};

module.exports = { protect, isAdmin };
// This code defines two middleware functions for an Express.js application that uses JWT for authentication. The `protect` middleware checks if a token is provided in the request headers and verifies it using a secret key. If the token is valid, it attaches the decoded user information to the request object and calls the next middleware. If the token is missing or invalid, it sends a 401 or 403 response, respectively. The `isAdmin` middleware checks if the user's role is 'admin' and denies access if not. Both middleware functions are exported for use in other parts of the application.
// This code is typically used in a Node.js application to protect certain routes and ensure that only authenticated users with the appropriate roles can access them. The `protect` middleware is applied to routes that require authentication, while the `isAdmin` middleware is used for routes that should only be accessible to admin users. This helps implement role-based access control (RBAC) in the application.