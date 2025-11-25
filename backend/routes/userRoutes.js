// routes/userRoutes.js
const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validateRequest');
const { signup, login } = require('../controllers/userController');

const router = express.Router();

// Signup validations
router.post(
  '/signup',
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').trim().isEmail().withMessage('A valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  validate,
  signup
);

// Login validations: require password and either email or username
router.post(
  '/login',
  [
    body('password').notEmpty().withMessage('Password is required'),
    body().custom((value) => {
      if (!value.email && !value.username) {
        throw new Error('Either email or username is required for login');
      }
      return true;
    })
  ],
  validate,
  login
);

module.exports = router;

