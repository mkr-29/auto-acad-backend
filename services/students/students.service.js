const Student = require("../../models/students/students.model");
const College = require("../../models/college/college.model");
const Subject = require("../../models/subjects/subjects.model");
const Parents = require("../../models/parents/parents.model");

// Fetch all students
const getAllStudents = async () => {
  try {
    const students = await Student.find({});
    return students;
  } catch (error) {
    throw new Error("Failed to fetch students: " + error.message);
  }
};

// Find a student by ID
const findStudentById = async (studentId) => {
  try {
    const student = await Student.findById(studentId);
    return student;
  } catch (error) {
    throw new Error("Failed to fetch student: " + error.message);
  }
};

// find students by user id
const getStudentsByUserId = async (userId, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const students = await Student.find({ userId })
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination info
    const total = await Student.countDocuments({ userId });

    // Get college data and subject data for all students
    const studentData = await Promise.all(students.map(async student => {
      const collegeData = await College.findById(student?.studentData?.collegeData);
      const parentsData = await Parents.findById(student?.studentData?.parentsData);
      
      // Fetch subject details for each subject in the student's subjectsData
      const subjectsData = await Promise.all(
        student?.studentData?.academicsData?.subjectsData?.map(async (subject) => {
          const subjectDetails = await Subject.findById(subject.subjectId);
          return {
            subjectName: subjectDetails?.subjectName || null,
            subjectCode: subjectDetails?.subjectCode || null,
            subjectNo: subject.subjectNo,
            subjectType: subjectDetails?.subjectType || null,
            attendance: subjectDetails?.attendance || null,
            noTestMarks: subjectDetails?.noOfTests || null,
            marks: subjectDetails?.marks || []
          };
        }) || []
      );

      return {
        name: student?.studentData?.personalData?.name,
        roll: collegeData?.roll || null,
        address: student.address,
        subjects: subjectsData,
        academics: {
          sgpa: student?.studentData?.academicsData?.sgpa || null,
          cgpa: student?.studentData?.academicsData?.cgpa || null,
          backlog: student?.studentData?.academicsData?.backlog || null,
          credits: student?.studentData?.academicsData?.credits || null
        },
        parents: {
          father: {
            name: parentsData?.father?.name || null,
            email: parentsData?.father?.email || null,
            phone: parentsData?.father?.phone || null
          },
          mother: {
            name: parentsData?.mother?.name || null,
            email: parentsData?.mother?.email || null,
            phone: parentsData?.mother?.phone || null
          }
        }
      };
    }));

    return {
      data: studentData,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    throw new Error("Failed to fetch students: " + error.message);
  }
}

// Create a new student
const createStudent = async (studentData) => {
  try {
    const student = await Student.create(studentData);
    return student;
  } catch (error) {
    throw new Error("Failed to create student: " + error.message);
  }
};

// Update student details
const updateStudent = async (studentId, studentData) => {
  try {
    const student = await Student.findByIdAndUpdate(studentId, studentData, {
      new: true,
    });
    return student;
  } catch (error) {
    throw new Error("Failed to update student: " + error.message);
  }
};

// Delete a student
const deleteStudent = async (studentId) => {
  try {
    const student = await Student.findByIdAndDelete(studentId);
    return student;
  } catch (error) {
    throw new Error("Failed to delete student: " + error.message);
  }
};

module.exports = {
  getAllStudents,
  findStudentById,
  getStudentsByUserId,
  createStudent,
  updateStudent,
  deleteStudent,
};