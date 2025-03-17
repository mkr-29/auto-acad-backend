const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  roll: {
    type: Number,
    required: [true, "Roll is required"],
    unique: true,
  },
  instituteCode: {
    type: String,
    required: [true, "Institute Code is required"],
  },
  academicYear: {
    type: String,
    required: [true, "Academic Year is required"],
  },
  program: {
    type: String,
    required: [true, "Program is required"],
  },
  branch: {
    type: String,
    required: [true, "Branch is required"],
  },
  batch: {
    type: String,
    required: [true, "Batch is required"],
  },
  semester: {
    type: Number,
    required: [true, "Semester is required"],
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
  },
  hostelName: {
    type: String,
    required: [false, "Hostel Name is optional"],
  },
  hostelNo: {
    type: String,
    required: [false, "Hostel No is optional"],
  },
  room: {
    type: Number,
    required: [false, "Room is optional"],
  },
});

module.exports = mongoose.model("College", collegeSchema);
