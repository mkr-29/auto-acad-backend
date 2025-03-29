const express = require("express");
const router = express.Router();
const {
  addEmail,
  getEmails,
  findEmailsByUserId,
  deleteEmail,
  getEmailTemplate,
} = require("../../controllers/emails/emails.controller");

router.post("/", addEmail);
// router.get("/", getEmails);
router.get("/:userId", findEmailsByUserId);
router.delete("/:emailId", deleteEmail);
router.get("/template/:emailId", getEmailTemplate);

module.exports = router;
