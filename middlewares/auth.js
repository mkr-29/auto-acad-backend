const jwt = require("jsonwebtoken");
const { getUser } = require("../services/auth/auth");

const restrictToLoggedInUserOnly = async (req, res, next) => {
    try {
        // Read token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized user - No token" });
        }

        const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

        // Verify the token
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user data (if needed)
        const user = await getUser(token);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized user - Invalid token" });
        }

        req.user = user; // Attach user data to the request
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = { restrictToLoggedInUserOnly };
