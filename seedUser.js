import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js"; // adjust path if your model is elsewhere

dotenv.config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const email = "test@example.com";
    const password = "123456";

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email);
    } else {
      const user = new User({
        first_name: "Test",
        last_name: "User",
        email,
        password: hashedPassword,
      });
      await user.save();
      console.log("Seeded user:", email);
    }

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding user:", err);
    process.exit(1);
  }
};

seedUser();
