const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    const admin = await User.findOne({ email: "Eventflix01@gmail.com" });
    console.log("Admin found:", admin);
    process.exit(0);
  })
  .catch(err => console.error(err));
