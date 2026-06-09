const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    roomType: {
      type: String,
      required: true,
      trim: true
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: 0
    },
    capacity: {
      type: Number,
      required: true,
      min: 1
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

roomSchema.index({ roomType: 1, capacity: 1, pricePerNight: 1 });

module.exports = mongoose.model("Room", roomSchema);

