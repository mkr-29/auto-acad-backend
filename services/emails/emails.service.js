const Emails = require("../../models/emails/emails.model");

// Create Email
const createEmail = async (emailData) => {
  try {
    const email = await Emails.create(emailData);
    return email;
  } catch (error) {
    throw new Error("Failed to create email: " + error.message);
  }
};

// Fetch all emails
const getAllEmails = async () => {
  try {
    const emails = await Emails.find({});
    return emails;
  } catch (error) {
    throw new Error("Failed to fetch emails: " + error.message);
  }
};

const getEmailsByUserId = async (userId) => {
  try {
    const emails = await Emails.find({ userId });
    return emails;
  } catch (error) {
    throw new Error("Failed to fetch emails: " + error.message);
  }
};

const deleteEmailById = async (emailId) => {
  try {
    const email = await Emails.findByIdAndDelete(emailId);
    return email;
  } catch (error) {
    throw new Error("Failed to delete email: " + error.message);
  }
};

const getEmailTemplateById = async (emailId) => {
  try {
    const email = await Emails.findById(emailId);
    return email;
  } catch (error) {
    throw new Error("Failed to get email template: " + error.message);
  }
};

module.exports = {
  createEmail,
  getAllEmails,
  getEmailsByUserId,
  deleteEmailById,
  getEmailTemplateById,
};
