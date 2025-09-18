const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// For Register API
const registerUser = async (req, res) => {
    try {
        
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"User Already Exists"
            });
        }

        // if not exists in the DB
        const hashedPass = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password : hashedPass });

        res.status(201).json({ message: "User registered successfully", userId: user._id });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};



// Login API

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // if user exists
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // generates a JWT (JSON Web Token) for the authenticated user
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : "1D"});
        
        res.cookie("token", token, {
            httpOnly: true,
            secure : true,
            sameSite : "strict"
        });

        res.status(200).json({ message : "Login Successful" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


// logout
const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
}


// get current user
const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        res.json(user);
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


module.exports = { registerUser, loginUser, logoutUser, getCurrentUser };