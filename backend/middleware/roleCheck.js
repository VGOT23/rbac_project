/**
 * Role-Based Authorization Middleware
 * 
 * Restricts access to routes based on user roles.
 * Must be used after the 'protect' middleware.
 */

/**
 * Check if user has required role(s)
 * @param {Array} allowedRoles - Array of roles allowed to access the route
 * @returns {Function} Middleware function
 * 
 * @example
 * router.get('/admin', protect, checkRole(['admin']), getAdminData);
 * router.post('/post', protect, checkRole(['admin', 'editor']), createPost);
 */
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    // Ensure user is authenticated (should be set by protect middleware)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    // Check if user's role is in the allowed roles array
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}. Your role: ${req.user.role}`,
      });
    }

    // User has required role, proceed to next middleware
    next();
  };
};

module.exports = { checkRole };

