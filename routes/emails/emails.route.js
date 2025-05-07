const express = require("express");
const router = express.Router();
const {
  addEmail,
  getEmails,
  findEmailsByUserId,
  deleteEmail,
  getEmailTemplate,
  updateEmail,
} = require("../../controllers/emails/emails.controller");

router.post("/", addEmail);
// router.get("/", getEmails);
router.get("/", findEmailsByUserId);
router.delete("/:emailId", deleteEmail);
router.get("/template/:emailId", getEmailTemplate);
router.put("/:emailId", updateEmail);

module.exports = router;
