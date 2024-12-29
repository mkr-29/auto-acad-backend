const jwt = require("jsonwebtoken");

const setUser = (user) => {
  const payload = {
    userId: user.userId,
    role: user.role,
  }
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const getUser = (token) => {
  if(!token) {
    return null;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return null;
  }
};

module.exports = { setUser, getUser };
