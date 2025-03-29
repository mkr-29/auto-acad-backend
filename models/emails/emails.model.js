const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, "Subject is required"],
    },
    body: {
        type: String,
        required: [true, "Mail body is required"],
    },
    lastEdited: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: Number,
        required: [true, "User ID is required"],
    },
});

module.exports = mongoose.model("Email", emailSchema);