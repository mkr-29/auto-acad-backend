const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: [true, "Subject Name is required"],
  },
  subjectCode: {
    type: String,
    required: [true, "Subject Code is required"],
  },
  subjectFaculty: {
    type: String,
    required: [true, "Subject Faculty is required"],
  },
  credits: {
    type: Number,
    required: [true, "Credits is required"],
  },
  subjectType: {
    type: String,
    required: [true, "Subject Type is required"],
  },
  attendance: {
    type: Number,
    required: [true, "Attendance is required"],
  },
  noOfTests: {
    type: Number,
    required: [true, "Number of Tests is required"],
  },
  marks: [
    {
      testNo: {
        type: Number,
        required: [true, "Test Number is required"],
      },
      score: {
        type: Number,
        default: null,
        validate: {
          validator: function(value) {
            return value === null || typeof value === "number";
          },
          message: "Score must be a number or null",
        }
      },
    },
  ],
});

subjectSchema.pre("save", function(next) {
  if(!this.marks || this.marks.length === 0) {
    this.marks = Array.from({ length: this.noOfTests }, (_, i) => ({
      testNo: i + 1,
      score: null,
    }));
  }
  next();
})

module.exports = mongoose.model("Subject", subjectSchema);
