const College = require('../../models/college/college.model');

// Create a new college record
const createCollege = async (collegeData) => {
    try {
        // Check if college record already exists for this roll number
        const existingCollege = await College.findOne({ roll: collegeData.roll });
        if (existingCollege) {
            throw new Error("College record with this roll number already exists");
        }

        const college = await College.create(collegeData);
        return college._id;
    } catch (error) {
        if (error.code === 11000) {
            throw new Error("Duplicate key error: College record already exists");
        }
        throw new Error("Failed to create college record: " + error.message);
    }
};

// Get college record by roll number
const getCollegeByRoll = async (roll, userId) => {
    try {
        const college = await College.findOne({ roll, userId });
        if (!college) {
            throw new Error("College record not found");
        }
        return college;
    } catch (error) {
        throw new Error("Failed to fetch college record: " + error.message);
    }
};

// Get all college records for a user
const getCollegesByUserId = async (userId) => {
    try {
        const colleges = await College.find({ userId, isActive: true });
        return colleges;
    } catch (error) {
        throw new Error("Failed to fetch college records: " + error.message);
    }
};

// Update college record
const updateCollege = async (roll, userId, updateData) => {
    try {
        // First verify the college record belongs to the user
        const college = await College.findOne({ roll, userId });
        if (!college) {
            throw new Error("College record not found or unauthorized");
        }

        const updatedCollege = await College.findOneAndUpdate(
            { roll, userId },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        return updatedCollege;
    } catch (error) {
        throw new Error("Failed to update college record: " + error.message);
    }
};

// Delete college record (soft delete)
const deleteCollege = async (roll, userId) => {
    try {
        // First verify the college record belongs to the user
        const college = await College.findOne({ roll, userId });
        if (!college) {
            throw new Error("College record not found or unauthorized");
        }

        const deletedCollege = await College.findOneAndUpdate(
            { roll, userId },
            { $set: { isActive: false } },
            { new: true }
        );

        return deletedCollege;
    } catch (error) {
        throw new Error("Failed to delete college record: " + error.message);
    }
};

module.exports = {
    createCollege,
    getCollegeByRoll,
    getCollegesByUserId,
    updateCollege,
    deleteCollege,
};