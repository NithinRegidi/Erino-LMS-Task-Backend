

//  authentication API routes

const express = require("express");
const { registerUser, loginUser, logoutUser, getCurrentUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Handle userRegistration
router.post("/register", registerUser);

// Handle userLogin
router.post("/login", loginUser);

// Handle userLogout
router.post("/logout", logoutUser);

// Returns the current logged-in user's info
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;