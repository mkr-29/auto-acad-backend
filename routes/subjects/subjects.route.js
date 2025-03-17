const express = require("express");
const router = express.Router();
const {
  addSubject,
} = require("../../controllers/subjects/subjects.controller");

router.post("/", addSubject);

module.exports = router;
