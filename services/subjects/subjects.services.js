const Subjects = require("../../models/subjects/subjects.model");

// create a new subject
const createSubject = async (subjectData) => {
  try {
    const subject = await Subjects.create(subjectData);
    return subject._id;
  } catch (error) {
    throw new Error("Failed to create subject: " + error.message);
  }
};

module.exports = {
  createSubject,
};
