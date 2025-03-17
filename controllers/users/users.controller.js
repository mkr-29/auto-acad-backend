const { hashPassword } = require("../../utils/hashedPassword");
const {
  getAllUsers,
  createUser,
  verifyUser,
} = require("../../services/users/users.service");
const { registerSchema, loginSchema } = require("./validation");
const validateRequest = require("../../middlewares/validate.middleware");

// GET all users
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

// POST - create a new user
const registerUsers = async (req, res) => {
  try {
    const { name, email, password, userId, role } = req.body;

    // Hash the password before saving
    const hashedPassword = await hashPassword(password);

    const user = await createUser({
      name,
      email,
      password: hashedPassword,
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
      message: "Failed to create user.",
      error: error.message,
    });
  }
};

// POST - verify user credentials
const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const { token, user } = await verifyUser(userId, password);

    // Set session cookie in the controller
    res.cookie("uid", token, {
      httpOnly: true, // Prevent JavaScript access
      secure: process.env.NODE_ENV === "development", // Use secure cookies in production
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

module.exports = {
  getUsers,
  registerUsers: [validateRequest(registerSchema), registerUsers],
  loginUser: [validateRequest(loginSchema), loginUser],
};
