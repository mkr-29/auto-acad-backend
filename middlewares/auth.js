const jwt = require("jsonwebtoken");
const { getUser } = require("../services/auth/auth");

const restrictToLoggedInUserOnly = async (req, res, next) => {
    try {
        // Read token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ 
                success: false,
                message: "Unauthorized - No token provided" 
            });
        }

        const token = authHeader.split(" ")[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ 
                success: false,
                message: "Unauthorized - Invalid token" 
            });
        }

        // Fetch user data
        const user = await getUser(token);
        if (!user || !user.isActive) {
            return res.status(401).json({ 
                success: false,
                message: "Unauthorized - User not found or inactive" 
            });
        }

        // Attach user data to the request
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false,
                message: "Token expired" 
            });
        }
        res.status(401).json({ 
            success: false,
            message: "Invalid or expired token" 
        });
    }
};

// Role-based access control middleware
const restrictToRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                success: false,
                message: "Unauthorized - No user found" 
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false,
                message: "Forbidden - Insufficient permissions" 
            });
        }

        next();
    };
};

module.exports = {
    restrictToLoggedInUserOnly,
    restrictToRoles,
};
