const { getUser } = require("../services/auth/auth");

const restrictToLoggedInUserOnly = async(req, res, next) => {
    const userUid = req.cookies?.uid;
    if (!userUid) {
        return res.status(401).json({ message: "Unauthorized user" });
    }

    const user = getUser(userUid);

    if (!user) {
        return res.status(401).json({ message: "Unauthorized user" });
    }

    req.user = user;
    next();
}

module.exports = { restrictToLoggedInUserOnly };