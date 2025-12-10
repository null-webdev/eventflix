const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/authMiddleware"); // admin only
const { createOrder, verifyPayment } = require("../controllers/paymentController");

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
// Create booking (no token required for users)
router.post("/", async (req, res) => {
  try {
    const { name, email, location, date, timeSlot, numberOfPeople, specialRequests } = req.body;

    // Validate required fields
    if (!name || !email || !location || !date || !timeSlot) {
      return res.status(400).json({ error: "Name, email, location, date, and time slot are required" });
    }

    // Validate location
    const validLocations = ["Ahmedabad", "Rajkot", "Surat", "Junagadh"];
    if (!validLocations.includes(location)) {
      return res.status(400).json({ error: "Invalid location" });
    }

    const booking = await Booking.create({
      name,
      email,
      location,
      date,
      timeSlot,
      numberOfPeople,
      specialRequests,
      status: "pending"
    });

    res.json({ message: "Booking created successfully", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all bookings (admin only)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
