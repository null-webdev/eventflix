// controllers/bookingController.js
const Booking = require("../models/Booking");

// Create a booking (public)
exports.createBooking = async (req, res) => {
    try {
        const bookingData = req.body;

        const booking = await Booking.create(bookingData);
        return res.status(201).json({
            message: "Booking submitted successfully!",
            booking
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to create booking" });
    }
};

// Get all bookings (for admin)
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        return res.status(200).json(bookings);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch bookings" });
    }
};
