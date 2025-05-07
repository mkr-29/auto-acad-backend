const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  roll: {
    type: Number,
    required: [true, "Roll is required"],
    unique: true,
    index: true,
  },
  instituteCode: {
    type: String,
    required: [true, "Institute Code is required"],
    trim: true,
    uppercase: true,
  },
  academicYear: {
    type: String,
    required: [true, "Academic Year is required"],
    match: [/^\d{4}-\d{4}$/, "Academic Year must be in format YYYY-YYYY"],
  },
  program: {
    type: String,
    required: [true, "Program is required"],
    trim: true,
    uppercase: true,
  },
  branch: {
    type: String,
    required: [true, "Branch is required"],
    trim: true,
    uppercase: true,
  },
  batch: {
    type: String,
    required: [true, "Batch is required"],
    match: [/^\d{4}$/, "Batch must be a 4-digit year"],
  },
  semester: {
    type: Number,
    required: [true, "Semester is required"],
    min: [1, "Semester must be at least 1"],
    max: [8, "Semester cannot exceed 8"],
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
    min: [1, "Year must be at least 1"],
    max: [4, "Year cannot exceed 4"],
  },
  hostelName: {
    type: String,
    trim: true,
    uppercase: true,
  },
  hostelNo: {
    type: String,
    trim: true,
    uppercase: true,
  },
  room: {
    type: Number,
    min: [1, "Room number must be at least 1"],
  },
  userId: {
    type: Number,
    required: [true, "User ID is required"],
    index: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes for better query performance
collegeSchema.index({ instituteCode: 1 });
collegeSchema.index({ academicYear: 1 });
collegeSchema.index({ program: 1 });
collegeSchema.index({ branch: 1 });
collegeSchema.index({ batch: 1 });

// Update the updatedAt field before saving
collegeSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("College", collegeSchema);
