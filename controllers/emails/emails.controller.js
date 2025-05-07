const {
  createEmail,
  getAllEmails,
  getEmailsByUserId,
  deleteEmailById,
  getEmailTemplateById,
  updateEmailById,
} = require("../../services/emails/emails.service");
const validation = require("./validation.js");

const addEmail = async (req, res) => {
  try {
    const { error } = validation.createEmailSchema.validate({
      subject: req.body.subject,
      body: req.body.body,
      lastEdited: req.body.lastEdited,
    }, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details,
      });
    }

    const emailData = {
      ...req.body,
      userId: req.user.userId // Get userId from authenticated user
    };

    const email = await createEmail(emailData);
    res.status(201).json({
      success: true,
      message: "Email created successfully",
      data: email,
    });
  } catch (error) {
    console.error("Error creating email:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to create email",
      error: error.message,
    });
  }
};

const getEmails = async (req, res) => {
  try {
    const emails = await getAllEmails();
    res.status(200).json({
      success: true,
      message: "Emails fetched successfully",
      data: emails,
    });
  } catch (error) {
    console.error("Error fetching emails:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to fetch emails",
      error: error.message,
    });
  }
};

const findEmailsByUserId = async (req, res) => {
  try {
    // Use authenticated user's ID instead of URL parameter
    const emails = await getEmailsByUserId(req.user.userId);
    if (!emails) {
      return res.status(404).json({
        success: false,
        message: "No emails found",
      });
    }
    // remove emails _id and __v
    emails.forEach((email) => {
      delete email._id;
      delete email.__v;
    });
    res.status(200).json({
      success: true,
      message: "Emails fetched successfully",
      data: emails,
    });
  } catch (error) {
    console.error("Error fetching emails:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to fetch emails",
      error: error.message,
    });
  }
};

const deleteEmail = async (req, res) => {
  try {
    const { emailId } = req.params;
    const email = await deleteEmailById(emailId, req.user.userId);
    res.status(200).json({
      success: true,
      message: "Email deleted successfully",
      data: email,
    });
  } catch (error) {
    console.error("Error deleting email:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to delete email",
      error: error.message,
    });
  }
};

const getEmailTemplate = async (req, res) => {
  try {
    const { emailId } = req.params;
    const email = await getEmailTemplateById(emailId, req.user.userId);
    res.status(200).json({
      success: true,
      message: "Email template fetched successfully",
      data: email,
    });
  } catch (error) {
    console.error("Error fetching email template:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to fetch email template",
      error: error.message,
    });
  }
};

const updateEmail = async (req, res) => {
  try {
    const { error } = validation.updateEmailSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details,
      });
    }

    const { emailId } = req.params;
    const updatedEmail = await updateEmailById(emailId, req.user.userId, req.body);
    
    res.status(200).json({
      success: true,
      message: "Email updated successfully",
      data: updatedEmail,
    });
  } catch (error) {
    console.error("Error updating email:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to update email",
      error: error.message,
    });
  }
};

module.exports = {
  addEmail,
  getEmails,
  findEmailsByUserId,
  deleteEmail,
  getEmailTemplate,
  updateEmail,
};
