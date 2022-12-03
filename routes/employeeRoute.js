const express = require("express");
const routes = express.Router();
const { protect } = require("../controllers/authController");
const {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/empController");

routes.get("/employees", getAllEmployees);

routes.post("/employees", protect, createEmployee);

routes.get("/employee/:id", protect, getEmployee);

routes.put("/employee/:id", protect, updateEmployee);

routes.delete("/employee/:id", protect, deleteEmployee);

module.exports = routes;
