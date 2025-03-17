const express = require("express");
const router = express.Router();
const {
    addCollege
} = require("../../controllers/college/college.controller");

router.post("/", addCollege);

module.exports = router;
