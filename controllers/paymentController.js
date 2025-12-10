// controllers/paymentController.js
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../models/Booking");

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create order
exports.createOrder = async (req, res) => {
    try {
        const { bookingId, amount } = req.body;
        if (!bookingId || !amount) return res.status(400).json({ error: "Booking ID & amount required" });

        const options = {
            amount: amount * 100, // in paise
            currency: "INR",
            receipt: bookingId
        };

        const order = await instance.orders.create(options);
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Razorpay order creation failed" });
    }
};

// Verify payment
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generated_signature = hmac.digest("hex");

        if (generated_signature === razorpay_signature) {
            // Payment successful, update booking
            const booking = await Booking.findOne({ _id: req.body.bookingId });
            if (booking) {
                booking.status = "confirmed";
                await booking.save();
            }
            res.json({ success: true });
        } else {
            res.status(400).json({ error: "Invalid signature" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Payment verification failed" });
    }
};
