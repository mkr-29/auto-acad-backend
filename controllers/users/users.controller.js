const { hashPassword } = require("../../utils/hashedPassword");
const {
  getAllUsers,
  createUser,
  verifyUser,
  updateUserProfile,
  deactivateUser,
} = require("../../services/users/users.service");
const { registerSchema, loginSchema } = require("./validation");
const validateRequest = require("../../middlewares/validate.middleware");
const { restrictToRoles } = require("../../middlewares/auth");

// POST - create a new user
const registerUsers = async (req, res) => {
  try {
    const { name, email, password, userId, role } = req.body;

    const user = await createUser({
      name,
      email,
      password,
      userId,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// POST - verify user credentials
const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const { token, user } = await verifyUser(userId, password);

    // Set session cookie
    res.cookie("uid", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(200).json({
      success: true,
      message: "User verified successfully.",
      data: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.error("Error verifying user:", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET - get all users (admin only)
const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users.",
      error: error.message,
    });
  }
};

// PUT - update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updateData = req.body;

    const updatedUser = await updateUserProfile(userId, updateData);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

// DELETE - deactivate user account
const deactivateAccount = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await deactivateUser(userId);

    // Clear the session cookie
    res.clearCookie("uid");

    res.status(200).json({
      success: true,
      message: "Account deactivated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error deactivating account:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to deactivate account",
      error: error.message,
    });
  }
};

module.exports = {
  registerUsers: [validateRequest(registerSchema), registerUsers],
  loginUser: [validateRequest(loginSchema), loginUser],
  getUsers: [restrictToRoles("mentor"), getUsers],
  updateProfile: [validateRequest(registerSchema), updateProfile],
  deactivateAccount: [deactivateAccount],
};
