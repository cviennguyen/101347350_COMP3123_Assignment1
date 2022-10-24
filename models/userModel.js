const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add a username"],
    primaryKey: true,
    validate: {
      validator: async (username) => {
        const usernameCount = await mongoose.models.User.countDocuments({
          username,
        });
        return !usernameCount;
      },
      message: "Username already exists",
    },
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: [true, "This email is already registered"],
    validate: {
      validator: async (email) => {
        const emailCount = await mongoose.models.User.countDocuments({
          email,
        });
        return !emailCount;
      },
      message: "Email already exists",
    },
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
});

module.exports = mongoose.model("User", UserSchema);
