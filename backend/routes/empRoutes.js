// routes/empRoutes.js
const express = require('express');
const { body, param, query } = require('express-validator');
const validate = require('../middleware/validateRequest');
const { getAllEmps, createEmp, getEmpById, updateEmp, deleteEmp } = require('../controllers/empController');

const router = express.Router();

// List - no validation needed
router.get('/employees', getAllEmps);

// Create employee
router.post(
  '/employees',
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

// Get by ID - validate path param
router.get(
  '/employees/:eid',
  [ param('eid').isMongoId().withMessage('Invalid employee id') ],
  validate,
  getEmpById
);

// Update by ID - validate path param + optional fields in body
router.put(
  '/employees/:eid',
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

// Delete by id via query param ?eid=...
router.delete(
  '/employees',
  [ query('eid').isMongoId().withMessage('Invalid employee id in query param') ],
  validate,
  deleteEmp
);

module.exports = router;

