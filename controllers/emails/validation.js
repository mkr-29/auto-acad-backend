const Joi = require("joi");

// Validation schema for email creation
const createEmailSchema = Joi.object({
  subject: Joi.string().required(),
  body: Joi.string().required(),
  lastEdited: Joi.date().optional(),
});

// Validation schema for email update
const updateEmailSchema = Joi.object({
  subject: Joi.string().optional(),
  body: Joi.string().optional(),
  lastEdited: Joi.date().optional(),
});

module.exports = {
  createEmailSchema,
  updateEmailSchema,
};
