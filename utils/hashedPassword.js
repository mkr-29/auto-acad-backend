const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    // Convert SALT_ROUNDS to a number
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

    if (isNaN(saltRounds) || saltRounds <= 0) {
      throw new Error("Invalid salt rounds value. Must be a positive integer.");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds); // Salt rounds should be a valid number
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error.message);
    throw new Error("Failed to hash the password.");
  }
};

module.exports = { hashPassword };
