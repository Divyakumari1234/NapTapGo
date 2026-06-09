const Booking = require("../models/Booking");
const Room = require("../models/Room");

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const calculateTotalAmount = (checkInDate, checkOutDate, pricePerNight) => {
  const nights = Math.ceil((checkOutDate - checkInDate) / MS_PER_DAY);
  return nights * pricePerNight;
};

const createBooking = async (req, res, next) => {
  try {
    const { roomId, checkInDate, checkOutDate } = req.body;

    if (!roomId || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "Room, check-in date, and check-out date are required" });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
      return res.status(400).json({ message: "Invalid booking dates" });
    }

    if (checkIn >= checkOut) {
      return res.status(400).json({ message: "Check-in date must be before check-out date" });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const conflictingBooking = await Booking.findOne({
      roomId,
      status: "confirmed",
      checkInDate: { $lt: checkOut },
      checkOutDate: { $gt: checkIn }
    });

    if (conflictingBooking) {
      return res.status(409).json({ message: "Room is already booked for the selected dates" });
    }

    const booking = await Booking.create({
      userId: req.user._id,
      roomId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalAmount: calculateTotalAmount(checkIn, checkOut, room.pricePerNight),
      status: "confirmed"
    });

    const populatedBooking = await booking.populate("roomId");
    return res.status(201).json(populatedBooking);
  } catch (error) {
    return next(error);
  }
};

const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate("roomId", "roomNumber roomType imageUrl")
      .sort({ createdAt: -1 });

    return res.json(bookings);
  } catch (error) {
    return next(error);
  }
};

const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can cancel only your own booking" });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    const populatedBooking = await booking.populate("roomId", "roomNumber roomType imageUrl");
    return res.json(populatedBooking);
  } catch (error) {
    return next(error);
  }
};

module.exports = { cancelBooking, createBooking, getMyBookings };

