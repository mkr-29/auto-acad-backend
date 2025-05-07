// const { v4: uuidv4 } = require("uuid");
const User = require("../../models/users/users.model");
const bcrypt = require("bcrypt");
const { setUser } = require("../auth/auth");

// Fetch all users (admin only)
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
    const existingUser = await User.findOne({ $or: [{ email }, { userId }] });
    if (existingUser) {
      throw new Error("User with this email or ID already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      userId,
      role,
    });

    // Exclude sensitive data before returning
    const { password: _, ...sanitizedUser } = user.toObject();

    // Generate session token
    const token = setUser(sanitizedUser);

    return { token, user: sanitizedUser };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Verify a user's credentials
const verifyUser = async (userId, plainTextPassword) => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.isActive) {
      throw new Error("User account is inactive");
    }

    // Check password validity
    const isPasswordValid = await bcrypt.compare(plainTextPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate session token
    const token = setUser(user);

    return { token, user };
  } catch (error) {
    throw new Error("Failed to verify user: " + error.message);
  }
};

// Update user profile
const updateUserProfile = async (userId, updateData) => {
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error("User not found");
    }

    // If password is being updated, hash it
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const updatedUser = await User.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    return updatedUser;
  } catch (error) {
    throw new Error("Failed to update user profile: " + error.message);
  }
};

// Deactivate user account
const deactivateUser = async (userId) => {
  try {
    const user = await User.findOneAndUpdate(
      { userId },
      { $set: { isActive: false } },
      { new: true }
    ).select('-password');

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error("Failed to deactivate user: " + error.message);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  verifyUser,
  updateUserProfile,
  deactivateUser,
};
