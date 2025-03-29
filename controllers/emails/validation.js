const Joi = require("joi");

// Validation schema for email creation
const createEmailSchema = Joi.object({
  subject: Joi.string().required(),
  body: Joi.string().required(),
  lastEdited: Joi.date().optional(),
  userId: Joi.number().required(),
});

module.exports = {
  createEmailSchema,
};
