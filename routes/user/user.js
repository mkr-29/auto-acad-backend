const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/101", (req, res) => {
  res.send("Hello 101");
});

router.get("/102", (req, res) => {
  res.send("Hello 102");
});

module.exports = router;
