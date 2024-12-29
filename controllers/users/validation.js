const Joi = require("joi");

// Validation schema for user registration
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  userId: Joi.number().min(3).required(),
  role: Joi.string().valid("mentor", "student").required(),
});

// Validation schema for user login
const loginSchema = Joi.object({
  userId: Joi.number().min(3).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
