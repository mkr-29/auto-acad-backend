const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  father: {
    name: {
      type: String,
      required: [true, "Father's Name is required"],
    },
    occupation: {
      type: String,
      required: [false, "Father's Occupation is optional"],
    },
    phone: {
      type: String,
      required: [true, "Father's Phone is required"],
    },
    email: {
      type: String,
      required: [true, "Father's Email is required"],
    },
  },
  mother: {
    name: {
      type: String,
      required: [true, "Mother's Name is required"],
    },
    occupation: {
      type: String,
      required: [false, "Mother's Occupation is optional"],
    },
    phone: {
      type: String,
      required: [false, "Mother's Phone is optional"],
    },
    email: {
      type: String,
      required: [false, "Mother's Email is optional"],
    },
  },
});

const Parents = mongoose.model("Parents", parentSchema);

module.exports = Parents;
