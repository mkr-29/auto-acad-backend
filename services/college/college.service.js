const College = require('../../models/college/college.model');

createCollege = async (collegeData) => {
    try {
        const college = await College.create(collegeData);
        return college._id;
    } catch (error) {
        throw new Error("Failed to create college: " + error.message);
    }
}

module.exports = {
    createCollege,
}