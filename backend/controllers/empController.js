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
console.log("🔥 UPDATE RECEIVED BODY:", req.body);
console.log("🔥 UPDATE RECEIVED FILE:", req.file);

    const eid = req.params.eid;
    if (!eid) return res.status(400).json({ message: "Missing employee id" });

    // Build update object from body
    const updateObj = { ...req.body };

    
    
    
    if (req.file) {
      updateObj.profile_picture = req.file.filename;
    }
    // If some form fields come as strings but should be numbers/dates, convert here
    if (updateObj.salary) updateObj.salary = parseFloat(updateObj.salary);


    const updated = await Employee.findByIdAndUpdate(eid, updateObj, { new: true, runValidators: true });

    if (!updated) return res.status(404).json({ message: "Employee not found" });

    return res.status(200).json({ message: "Employee updated successfully", employee: updated });
  } catch (err) {
    // Send full error for debugging 
    return res.status(500).json({ message: "Update failed", error: err.message });
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

//search
exports.searchEmployees = async (req, res) => {
  try {
    const { department, position } = req.query;

    // If no filters, return everything
    if (!department && !position) {
      const all = await Employee.find();
      return res.status(200).json(all);
    }

    const queryObj = {}; // <--- make sure this line exists!
    if (department) queryObj.department = department;
    if (position) queryObj.position = position;

    const employees = await Employee.find(queryObj);
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};






