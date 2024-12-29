const express = require("express");
const User = require("../../models/users/users.model");
const router = express.Router();
const {
  getUsers,
  registerUsers,
  loginUser,
} = require("../../controllers/users/users.controller");

router.get("/", getUsers);
router.post("/login", loginUser);
router.post("/register", registerUsers);

module.exports = router;
