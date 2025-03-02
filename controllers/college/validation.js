const Joi = require("joi");

// Validation schema for college creation
const createCollegeSchema = Joi.object({
  roll: Joi.number().required(),
  instituteCode: Joi.string().required(),
  academicYear: Joi.string().required(),
  program: Joi.string().required(),
  branch: Joi.string().required(),
  batch: Joi.string().required(),
  semester: Joi.number().required(),
  year: Joi.number().required(),
  hostelName: Joi.string().optional(),
  hostelNo: Joi.string().optional(),
  room: Joi.number().optional(),
});

module.exports = {
  createCollegeSchema,
};
