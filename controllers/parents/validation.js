const Joi = require("joi");

// Validation schema for parent creation
const createParentSchema = Joi.object({
  father: Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().optional(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
  }).required(),
  mother: Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().optional(),
    phone: Joi.string().optional(),
    email: Joi.string().optional(),
  }).required(),
});

module.exports = {
  createParentSchema,
};
