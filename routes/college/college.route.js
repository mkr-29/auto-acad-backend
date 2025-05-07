const express = require("express");
const router = express.Router();
const { restrictToLoggedInUserOnly } = require("../../middlewares/auth");
const {
    addCollege,
    getCollege,
    getColleges,
    updateCollegeDetails,
    removeCollege,
} = require("../../controllers/college/college.controller");

// Apply authentication middleware to all college routes
router.use(restrictToLoggedInUserOnly);

// Create a new college record
router.post("/", addCollege);

// Get a specific college record by roll number
router.get("/:roll", getCollege);

// Get all college records for the authenticated user
router.get("/", getColleges);

// Update a college record
router.put("/:roll", updateCollegeDetails);

// Delete a college record (soft delete)
router.delete("/:roll", removeCollege);

module.exports = router;
