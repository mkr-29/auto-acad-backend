const Joi = require("joi");

// Validation schema for college creation
const createCollegeSchema = Joi.object({
  roll: Joi.number()
    .required()
    .messages({
      'number.base': 'Roll number must be a number',
      'any.required': 'Roll number is required',
    }),
  instituteCode: Joi.string()
    .required()
    .trim()
    .uppercase()
    .messages({
      'string.empty': 'Institute Code is required',
      'any.required': 'Institute Code is required',
    }),
  academicYear: Joi.string()
    .required()
    .pattern(/^\d{4}-\d{4}$/)
    .messages({
      'string.empty': 'Academic Year is required',
      'string.pattern.base': 'Academic Year must be in format YYYY-YYYY',
    }),
  program: Joi.string()
    .required()
    .trim()
    .uppercase()
    .messages({
      'string.empty': 'Program is required',
      'any.required': 'Program is required',
    }),
  branch: Joi.string()
    .required()
    .trim()
    .uppercase()
    .messages({
      'string.empty': 'Branch is required',
      'any.required': 'Branch is required',
    }),
  batch: Joi.string()
    .required()
    .pattern(/^\d{4}$/)
    .messages({
      'string.empty': 'Batch is required',
      'string.pattern.base': 'Batch must be a 4-digit year',
    }),
  semester: Joi.number()
    .required()
    .min(1)
    .max(8)
    .messages({
      'number.base': 'Semester must be a number',
      'number.min': 'Semester must be at least 1',
      'number.max': 'Semester cannot exceed 8',
      'any.required': 'Semester is required',
    }),
  year: Joi.number()
    .required()
    .min(1)
    .max(4)
    .messages({
      'number.base': 'Year must be a number',
      'number.min': 'Year must be at least 1',
      'number.max': 'Year cannot exceed 4',
      'any.required': 'Year is required',
    }),
  hostelName: Joi.string()
    .trim()
    .uppercase()
    .allow('')
    .optional(),
  hostelNo: Joi.string()
    .trim()
    .uppercase()
    .allow('')
    .optional(),
  room: Joi.number()
    .min(1)
    .allow(null)
    .optional(),
});

// Validation schema for college update
const updateCollegeSchema = Joi.object({
  roll: Joi.number()
    .messages({
      'number.base': 'Roll number must be a number',
    }),
  instituteCode: Joi.string()
    .trim()
    .uppercase()
    .messages({
      'string.empty': 'Institute Code cannot be empty',
    }),
  academicYear: Joi.string()
    .pattern(/^\d{4}-\d{4}$/)
    .messages({
      'string.pattern.base': 'Academic Year must be in format YYYY-YYYY',
    }),
  program: Joi.string()
    .trim()
    .uppercase(),
  branch: Joi.string()
    .trim()
    .uppercase(),
  batch: Joi.string()
    .pattern(/^\d{4}$/)
    .messages({
      'string.pattern.base': 'Batch must be a 4-digit year',
    }),
  semester: Joi.number()
    .min(1)
    .max(8)
    .messages({
      'number.min': 'Semester must be at least 1',
      'number.max': 'Semester cannot exceed 8',
    }),
  year: Joi.number()
    .min(1)
    .max(4)
    .messages({
      'number.min': 'Year must be at least 1',
      'number.max': 'Year cannot exceed 4',
    }),
  hostelName: Joi.string()
    .trim()
    .uppercase()
    .allow(''),
  hostelNo: Joi.string()
    .trim()
    .uppercase()
    .allow(''),
  room: Joi.number()
    .min(1)
    .allow(null),
});

module.exports = {
  createCollegeSchema,
  updateCollegeSchema,
};
