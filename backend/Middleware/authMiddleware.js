const jwt = require("jsonwebtoken");

require('dotenv').config();

// Middleware function to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        
        // Extracting the token from the 'Authorization' header, expected in the format 'Bearer <token>'
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.status(401).json({ message: "No token provided" });

        const secret = process.env.JWT_SECRET || "1234";  // Use a fallback secret 1234 if env variable is missing

        // Verify the token
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                console.error("Token verification failed:", err.message);
                return res.status(403).json({ message: "Invalid token" });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        console.error("Error in token authentication:", error);
        return res.status(500).json({ message: "Server error during token authentication" });
    }
};

module.exports = { authenticateToken };

