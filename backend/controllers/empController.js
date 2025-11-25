const Employee = require('../models/empModel');

// List all employees
exports.getAllEmps = async (req, res) => {
  try {
    const emps = await Employee.find();
    res.status(200).json(emps);
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Create new employee
exports.createEmp = async (req, res) => {
  try {
    const emp = await Employee.create(req.body);
    res.status(201).json({ message: "Employee created successfully.", employee_id: emp._id });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// Get employee by ID
exports.getEmpById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.eid);
    if (!emp) return res.status(404).json({ status: false, message: "Employee not found" });
    res.status(200).json(emp);
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// Update employee by ID
exports.updateEmp = async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.eid, req.body);
    res.status(200).json({ message: "Employee details updated successfully." });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// Delete employee by ID (query param)
exports.deleteEmp = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.query.eid);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};
