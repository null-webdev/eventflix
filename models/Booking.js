// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  name: { type: String, required: true },
  email: { type: String, required: true },

  location: {
    type: String,
    enum: ["Ahmedabad", "Rajkot", "Surat", "Junagadh"],
    required: true
  },

  packageType: {
    type: String,
    enum: ["Silver", "Premium", "Gold"],
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  date: { type: Date, required: true },

  timeSlot: {
    type: String,
    required: true
  },

  specialRequests: {
    type: String,
    default: ""
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },

  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
