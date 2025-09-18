const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User.js"); // adjust path if needed

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
        name: "Test User",
        email,
        password: hashedPassword,
      });
      await user.save();
      console.log("✅ Seeded user:", email);
    }

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding user:", err.message);
    process.exit(1);
  }
};

seedUser();