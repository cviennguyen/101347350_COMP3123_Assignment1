const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    },
    message: "Email already exists",
  },
  // role: {
  //   type: String,
  //   enum: {
  //     values: ["admin", "user", "guest"],
  //     message: `{VALUE} provided is not valid`,
  //   },
  //   default: "user",
  // },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
  },
  // passwordChangedAt: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10
//     );

//     return JWTTimestamp < changedTimestamp;
//   }

//   return false;
// };

module.exports = mongoose.model("User", UserSchema);
