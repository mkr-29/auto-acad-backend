const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentData: {
    personalData: {
      name: {
        type: String,
        required: [true, "Name is required"],
      },
      dob: {
        type: String,
        required: [true, "Date of Birth is required"],
      },
      bloodGroup: {
        type: String,
        required: [false, "Blood Group is optional"],
      },
      gender: {
        type: String,
        required: [true, "Gender is rqeuired"],
      },
      nationality: {
        type: String,
        required: [true, "Nationality is required"],
      },
      category: {
        type: String,
        required: [true, "Category is required"],
      },
    },
    collegeData: {
      type: String,
      required: [true, "College Data is required"],
    },
    academicsData: {
      subjectCount: {
        type: Number,
        required: [true, "Count is required"],
      },
      sgpa: {
        type: Number,
        required: [true, "SGPA is required"],
      },
      cgpa: {
        type: Number,
        required: [true, "CGPA is required"],
      },
      backlog: {
        type: Number,
        required: [true, "Backlog is required"],
      },
      credits: {
        type: Number,
        required: [true, "Credits is required"],
      },
      subjectsData: [
        {
          subjectNo: {
            type: Number,
            required: [true, "Subject Number is required"],
          },
          subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: [true, "Subjects Data is required"],
          },
        },
      ],
    },
    parentsData: {
      type: String,
      required: [true, "Parents Data ID is required"],
    },
  },
  userId: {
    type: Number,
    required: [true, "User ID is required"],
  },
});

// Pre save hook to add subject count
studentSchema.pre("save", async function (next) {
  if (
    !this.studentData.academicsData.subjectsData ||
    this.studentData.academicsData.subjectsData.length === 0
  ) {
    this.studentData.subjectsData = Array.from(
      { length: this.studentData.academicsData.subjectCount },
      (_, i) => ({
        subjectNo: i + 1,
        subjectId: new mongoose.Types.ObjectId(),
      })
    );
  }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
