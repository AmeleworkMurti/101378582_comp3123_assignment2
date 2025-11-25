// routes/empRoutes.js
const auth = require("../middleware/auth");
const express = require('express');
const { body, param, query } = require('express-validator');
const validate = require('../middleware/validateRequest');
const { getAllEmps, createEmp, getEmpById, updateEmp, deleteEmp } = require('../controllers/empController');

const router = express.Router();

// =========================
// PROTECTED ROUTES BELOW
// =========================

// List employees
router.get(
  '/employees',
  auth,              
  getAllEmps
);

// Create employee
router.post(
  '/employees',
  auth,               
  [
    body('first_name').trim().notEmpty().withMessage('first_name is required'),
    body('last_name').trim().notEmpty().withMessage('last_name is required'),
    body('email').trim().isEmail().withMessage('A valid email is required'),
    body('position').trim().notEmpty().withMessage('position is required'),
    body('salary').isFloat({ gt: 0 }).withMessage('salary must be a number greater than 0'),
    body('date_of_joining').isISO8601().withMessage('date_of_joining must be a valid date (YYYY-MM-DD)'),
    body('department').trim().notEmpty().withMessage('department is required')
  ],
  validate,
  createEmp
);

// Get employee by ID
router.get(
  '/employees/:eid',
  auth,             
  [
    param('eid').isMongoId().withMessage('Invalid employee id')
  ],
  validate,
  getEmpById
);

// Update employee by ID
router.put(
  '/employees/:eid',
  auth,              
  [
    param('eid').isMongoId().withMessage('Invalid employee id'),
    body('position').optional().trim().notEmpty().withMessage('position cannot be empty'),
    body('salary').optional().isFloat({ gt: 0 }).withMessage('salary must be a number greater than 0'),
    body('date_of_joining').optional().isISO8601().withMessage('date_of_joining must be a valid date'),
    body('email').optional().isEmail().withMessage('If provided, email must be valid')
  ],
  validate,
  updateEmp
);

// Delete employee by ID (query param)
router.delete(
  '/employees',
  auth,               
  [
    query('eid').isMongoId().withMessage('Invalid employee id in query param')
  ],
  validate,
  deleteEmp
);

module.exports = router;
