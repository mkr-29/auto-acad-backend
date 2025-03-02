const express = require("express");
const router = express.Router();
const { addParent } = require("../../controllers/parents/parents.controller");

router.post("/", addParent);

module.exports = router;
