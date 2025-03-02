const { createSubject } = require("../../services/subjects/subjects.services");
const { createSubjectSchema } = require("./validation.js");

// POST - create a new subject
const addSubject = async (req, res) => {
  try {
    // Validate request body using Joi schema
    const { error } = createSubjectSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details,
      });
    }

    const subject = await createSubject(req.body);
    res.status(201).json({
      success: true,
      data: subject,
    });
  } catch (error) {
    console.error("Error creating subject:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create subject.",
      error: error.message,
    });
  }
};

module.exports = {
  addSubject,
};
