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

const getEmailsByUserId = async (userId) => {
  try {
    const emails = await Emails.find({ userId });
    return emails;
  } catch (error) {
    throw new Error("Failed to fetch emails: " + error.message);
  }
};

const deleteEmailById = async (emailId, userId) => {
  try {
    // First verify the email belongs to the user
    const email = await Emails.findOne({ _id: emailId, userId });
    if (!email) {
      throw new Error("Email not found or unauthorized");
    }
    await Emails.findByIdAndDelete(emailId);
    return email;
  } catch (error) {
    throw new Error("Failed to delete email: " + error.message);
  }
};

const getEmailTemplateById = async (emailId, userId) => {
  try {
    const email = await Emails.findOne({ _id: emailId, userId });
    if (!email) {
      throw new Error("Email template not found or unauthorized");
    }
    return email;
  } catch (error) {
    throw new Error("Failed to get email template: " + error.message);
  }
};

const updateEmailById = async (emailId, userId, updateData) => {
  try {
    // First verify the email belongs to the user
    const email = await Emails.findOne({ _id: emailId, userId });
    if (!email) {
      throw new Error("Email not found or unauthorized");
    }

    // Update the email
    const updatedEmail = await Emails.findByIdAndUpdate(
      emailId,
      { ...updateData, lastEdited: new Date() },
      { new: true, runValidators: true }
    );

    return updatedEmail;
  } catch (error) {
    throw new Error("Failed to update email: " + error.message);
  }
};

module.exports = {
  createEmail,
  getEmailsByUserId,
  deleteEmailById,
  getEmailTemplateById,
  updateEmailById,
};
