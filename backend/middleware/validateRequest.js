// middleware/validateRequest.js
const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return the first error message and the full array for debugging
    return res.status(400).json({
      status: false,
      message: errors.array()[0].msg,
      errors: errors.array()
    });
  }
  next();
};
