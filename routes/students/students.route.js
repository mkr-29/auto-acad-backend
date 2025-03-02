const express = require("express");
const router = express.Router();
const {
  getStudents,
  findStudent,
  addStudent,
  updateStudentDetails,
  removeStudent,
} = require("../../controllers/students/students.controller");

router.get("/", getStudents);
router.get("/:id", findStudent);
router.post("/", addStudent);
router.put("/:id", updateStudentDetails);
router.delete("/:id", removeStudent);

module.exports = router;
