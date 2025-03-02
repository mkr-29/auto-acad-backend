const Student = require("../../models/students/students.model");

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
  createStudent,
  updateStudent,
  deleteStudent,
};