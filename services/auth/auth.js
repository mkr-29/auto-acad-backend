const jwt = require("jsonwebtoken");
const User = require("../../models/users/users.model");

const setUser = (user) => {
  const payload = {
    userId: user.userId,
    role: user.role,
  }
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const getUser = async (token) => {
  if(!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ 
      userId: decoded.userId,
      isActive: true 
    }).select('-password');
    
    return user;
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return null;
  }
};

module.exports = { setUser, getUser };
