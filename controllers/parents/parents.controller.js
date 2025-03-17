const { createParent } = require("../../services/parents/parents.service");
const validation = require("./validation.js");

// POST - create a new parent
const addParent = async (req, res) => {
  try {
    // Validate request body using Joi schema
    const { error } = validation.createParentSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details,
      });
    }

    // Create new parent
    const parent = await createParent(req.body);
    res.status(201).json({
      success: true,
      message: "Parent created successfully",
      data: parent,
    });
  } catch (error) {
    console.error("Error creating parent:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to create parent",
      error: error.message,
    });
  }
};

module.exports = {
  addParent,
};