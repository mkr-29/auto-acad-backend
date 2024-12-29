const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    userId: {
      type: Number,
      required: [true, "User ID is required"],
      uique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["mentor", "student"],
      default: "user",
      required: [true, "Role is required"],
    },
  },
  { 
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;