const express = require("express");
const router = express.Router();
const {
  getUsers,
  registerUsers,
  loginUser,
  updateProfile,
  deactivateAccount,
} = require("../../controllers/users/users.controller");
const { restrictToLoggedInUserOnly } = require("../../middlewares/auth");

// Public routes
router.post("/login", loginUser);
router.post("/register", registerUsers);

// Protected routes
router.get("/", restrictToLoggedInUserOnly, getUsers);
router.put("/profile", restrictToLoggedInUserOnly, updateProfile);
router.delete("/deactivate", restrictToLoggedInUserOnly, deactivateAccount);

module.exports = router;
