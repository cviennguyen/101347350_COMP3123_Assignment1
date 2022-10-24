const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add a first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please add a last name"],
  },
  email: {
    type: String,
    validate: {
      validator: async (email) => {
        const emailCount = await mongoose.models.Employee.countDocuments({
          email,
        });
        return !emailCount;
      },
      message: "Email already exists",
    },
  },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Female", "Other"],
      message: `{VALUE} provided is not valid`,
    },
  },
  salary: {
    type: Number,
    required: [true, "Please add a salary"],
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
