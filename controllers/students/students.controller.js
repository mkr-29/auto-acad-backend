const {
  getAllStudents,
  findStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentsByUserId,
} = require("../../services/students/students.service");
const validation = require("./validation");

// GET all students
const getStudents = async (req, res) => {
  try {
    const students = await getAllStudents();
    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch students.",
      error: error.message,
    });
  }
};

// Find a student by ID
const findStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await findStudentById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }
    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error("Error fetching student:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch student.",
      error: error.message,
    });
  }
};

// GET students by mentor's userId
const findStudentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const students = await getStudentsByUserId(userId);
    
    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students by userId:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch students.",
      error: error.message,
    });
  }
};

// POST - create a new student
const addStudent = async (req, res) => {
  try {
    // Validate request body using Joi schema
    const { error } = validation.createStudentSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error.",
        errors: error.details.map((detail) => detail.message),
      });
    }

    // save student to database
    const student = await createStudent(req.body);

    res.status(201).json({
      success: true,
      message: "Student created successfully.",
      data: student,
    });
  } catch (error) {
    console.error("Error creating student:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to create student.",
      error: error.message,
    });
  }
};

// PUT - update student details
const updateStudentDetails = async (req, res) => {
  try {
    const studentId = req.params.id;

    // Validate request body using Joi schema
    const { error } = validation.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error.",
        errors: error.details.map((detail) => detail.message),
      });
    }

    // update student details
    const student = await updateStudent(studentId, req.body);

    res.status(200).json({
      success: true,
      message: "Student updated successfully.",
      data: student,
    });
  } catch (error) {
    console.error("Error updating student:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to update student.",
      error: error.message,
    });
  }
};

// DELETE - delete a student
const removeStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await deleteStudent(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Student deleted successfully.",
      data: student,
    });
  } catch (error) {
    console.error("Error deleting student:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete student.",
      error: error.message,
    });
  }
};

module.exports = {
  getStudents,
  findStudent,
  addStudent,
  findStudentsByUserId,
  updateStudentDetails,
  removeStudent,
};
