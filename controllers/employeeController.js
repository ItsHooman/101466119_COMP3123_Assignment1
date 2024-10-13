const Employee = require('../models/employeeModel');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

exports.createEmployee = async (req, res) => {
  const employee = new Employee(req.body);
  try {
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee_id: employee._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee' });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee details' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.eid, req.body);
    res.status(200).json({ message: 'Employee details updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee details' });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.query.eid);
    res.status(204).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee' });
  }
};

