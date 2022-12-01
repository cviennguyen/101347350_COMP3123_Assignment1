const Employee = require("../models/employeeModel.js");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).send({
      status: true,
      message: "Employees fetched successfully",
      data: employees,
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

exports.createEmployee = async (req, res) => {
  const { firstName, lastName, email, gender, salary } = req.body;
  if (salary < 0) {
    res.status(401).send({
      status: false,
      message: "Salary cannot be negative",
    });
  }
  try {
    const employee = await Employee.create({
      firstName,
      lastName,
      email,
      gender,
      salary,
    });
    res.status(201).send({
      status: true,
      message: "Employee created successfully",
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

exports.getEmployee = async (req, res) => {
  try {
    console.log(req.params.id);
    const employee = await Employee.findById(req.params.id);
    res.status(200).send({
      status: true,
      message: "Employee fetched successfully",
      data: employee,
    });
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send({
      status: true,
      message: "Employee updated successfully",
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    res.status(204).send({});
  } catch (err) {
    console.log(err);
    res.status(401).send({
      status: false,
      message: err,
    });
  }
};
