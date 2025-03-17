const { createCollege } = require("../../services/college/college.service");
const validation = require("./validation");
// Create a new college
const addCollege = async (req, res) => {
  try {
    // Validate request body using Joi schema
    const { error } = validation.createCollegeSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details,
      });
    }

    const college = await createCollege(req.body);

    res.status(201).json({
      success: true,
      data: college._id,
      message: "Student added successfully.",
    });
  } catch (error) {
    if (error.message.includes("duplicate key error collection")) {
      return res.status(400).json({
        success: false,
        error: error.message,
        message: "Student already exists.",
      });
    } else {
      res.status(500).json({
        success: false,
        error: error.message,
        message: "Failed to add student.",
      });
    }
  }
};

module.exports = {
  addCollege,
};
