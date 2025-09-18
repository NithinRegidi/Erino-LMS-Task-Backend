
const jwt = require("jsonwebtoken");

// Middleware to protect routes and verify JWT from cookie

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next(); // Proceed to next middleware/route
        
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = authMiddleware;