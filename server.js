const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});


app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// allow frontend Vercel domain
app.use(cors({
  origin: "https://erino-lms-task-frontend.vercel.app",  // your Vercel URL
  credentials: true,  // allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // allow all HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"],     // allow headers your frontend sends
}));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
