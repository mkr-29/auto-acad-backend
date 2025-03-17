const Parents = require("../../models/parents/parents.model");

// Create new parent
const createParent = async (parentData) => {
  try {
    const parent = await Parents.create(parentData);
    return parent._id;
  } catch (error) {
    throw new Error("Failed to create parent: " + error.message);
  }
};

module.exports = {
  createParent,
};
