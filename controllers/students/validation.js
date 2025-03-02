const Joi = require("joi");

// Validation schema for student creation
const createStudentSchema = Joi.object({
  studentData: Joi.object({
    personalData: Joi.object({
      name: Joi.string().min(3).max(30).required(),
      dob: Joi.string().required(),
      bloodGroup: Joi.string().optional(),
      gender: Joi.string().required(),
      nationality: Joi.string().required(),
      category: Joi.string().required(),
    }).required(),

    collegeData: Joi.string().required(),

    academicsData: Joi.object({
      subjectCount: Joi.number().required(),
      sgpa: Joi.number().required(),
      cgpa: Joi.number().required(),
      backlog: Joi.number().required(),
      credits: Joi.number().required(),
      subjectsData: Joi.array().required(),
    }).required(),

    parentsData: Joi.string().required(),
  }).required(),
});

module.exports = {
  createStudentSchema,
};
