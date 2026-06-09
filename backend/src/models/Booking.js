const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true
    },
    checkInDate: {
      type: Date,
      required: true
    },
    checkOutDate: {
      type: Date,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed"
    }
  },
  { timestamps: true }
);

bookingSchema.index({ roomId: 1, checkInDate: 1, checkOutDate: 1, status: 1 });
bookingSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Booking", bookingSchema);

