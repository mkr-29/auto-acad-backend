// const { v4: uuidv4 } = require("uuid");
const User = require("../../models/users/users.model");
const bcrypt = require("bcrypt");
const { setUser } = require("../auth/auth");

// Fetch all users
const getAllUsers = async () => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude passwords
    return users;
  } catch (error) {
    throw new Error("Failed to fetch users: " + error.message);
  }
};

// Create a new user
const createUser = async (userData) => {
  try {
    const { name, email, password, userId, role } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Create new user
    const user = await User.create({ name, email, password, userId, role });

    // Exclude sensitive data before returning
    const { password: _, ...sanitizedUser } = user.toObject();

    // Generate session token
    const token = setUser(sanitizedUser);

    return { token, user: sanitizedUser }; // Pass to controller for further processing
  } catch (error) {
    throw new Error("Failed to create user: " + error.message);
  }
};

// Verify a user's credentials
const verifyUser = async (userId, plainTextPassword) => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error("User not found");
    }

    // Check password validity
    const isPasswordValid = await bcrypt.compare(plainTextPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Generate session token
    const token = setUser(user);

    return { token, user }; // Pass to controller for further processing
  } catch (error) {
    throw new Error("Failed to verify user: " + error.message);
  }
};

module.exports = { getAllUsers, createUser, verifyUser };
