const Joi = require("joi");

// Password validation rules
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Validation schema for user registration
const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .trim()
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name cannot exceed 30 characters',
    }),
  email: Joi.string()
    .email()
    .trim()
    .lowercase()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address',
    }),
  password: Joi.string()
    .pattern(passwordPattern)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.pattern.base': 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
    }),
  userId: Joi.number()
    .required()
    .messages({
      'number.base': 'User ID must be a number',
      'any.required': 'User ID is required',
    }),
  role: Joi.string()
    .valid("mentor", "student")
    .required()
    .messages({
      'string.empty': 'Role is required',
      'any.only': 'Role must be either mentor or student',
    }),
});

// Validation schema for user login
const loginSchema = Joi.object({
  userId: Joi.number()
    .required()
    .messages({
      'number.base': 'User ID must be a number',
      'any.required': 'User ID is required',
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required',
    }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
