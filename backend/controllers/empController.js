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
    // Extract profile picture filename if uploaded
    const profile_picture = req.file ? req.file.filename : null;

    // Merge profile_picture into request body
    const empData = { ...req.body, profile_picture };

    const emp = await Employee.create(empData);

    res.status(201).json({
      message: "Employee created successfully.",
      employee_id: emp._id,
      profile_picture: emp.profile_picture
    });
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
    const updatedData = { ...req.body };

    // If new profile picture is uploaded, include it
    if (req.file) {
      updatedData.profile_picture = req.file.filename;
    }

    await Employee.findByIdAndUpdate(req.params.eid, updatedData);

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
