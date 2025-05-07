const {
  createCollege,
  getCollegeByRoll,
  getCollegesByUserId,
  updateCollege,
  deleteCollege,
} = require("../../services/college/college.service");
const validation = require("./validation");

// Create a new college record
const addCollege = async (req, res) => {
  try {
    // Validate request body
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

    // Add userId from authenticated user
    const collegeData = {
      ...req.body,
      userId: req.user.userId,
    };

    const college = await createCollege(collegeData);

    res.status(201).json({
      success: true,
      message: "College record created successfully",
      data: college,
    });
  } catch (error) {
    console.error("Error creating college record:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to create college record",
      error: error.message,
    });
  }
};

// Get college record by roll number
const getCollege = async (req, res) => {
  try {
    const { roll } = req.params;
    const college = await getCollegeByRoll(roll, req.user.userId);

    res.status(200).json({
      success: true,
      data: college,
    });
  } catch (error) {
    console.error("Error fetching college record:", error.message);
    res.status(404).json({
      success: false,
      message: "Failed to fetch college record",
      error: error.message,
    });
  }
};

// Get all college records for the user
const getColleges = async (req, res) => {
  try {
    const colleges = await getCollegesByUserId(req.user.userId);

    res.status(200).json({
      success: true,
      data: colleges,
    });
  } catch (error) {
    console.error("Error fetching college records:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to fetch college records",
      error: error.message,
    });
  }
};

// Update college record
const updateCollegeDetails = async (req, res) => {
  try {
    const { roll } = req.params;
    const { error } = validation.updateCollegeSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details,
      });
    }

    const updatedCollege = await updateCollege(roll, req.user.userId, req.body);

    res.status(200).json({
      success: true,
      message: "College record updated successfully",
      data: updatedCollege,
    });
  } catch (error) {
    console.error("Error updating college record:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to update college record",
      error: error.message,
    });
  }
};

// Delete college record (soft delete)
const removeCollege = async (req, res) => {
  try {
    const { roll } = req.params;
    const deletedCollege = await deleteCollege(roll, req.user.userId);

    res.status(200).json({
      success: true,
      message: "College record deleted successfully",
      data: deletedCollege,
    });
  } catch (error) {
    console.error("Error deleting college record:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to delete college record",
      error: error.message,
    });
  }
};

module.exports = {
  addCollege,
  getCollege,
  getColleges,
  updateCollegeDetails,
  removeCollege,
};
