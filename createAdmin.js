const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const email = "eventflix879@gmail.com"; // your admin email
const password = "EventFlixUSrDtabaseAdmin1111"; // your admin password

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("Admin already exists. Exiting...");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    console.log("Admin inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
}

createAdmin();
