const Booking = require("../models/Booking");
const Room = require("../models/Room");

const getDashboard = async (req, res, next) => {
  try {
    const [totalRooms, totalBookings, revenueResult] = await Promise.all([
      Room.countDocuments(),
      Booking.countDocuments(),
      Booking.aggregate([
        { $match: { status: "confirmed" } },
        { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
      ])
    ]);

    return res.json({
      totalRooms,
      totalBookings,
      totalRevenue: revenueResult[0]?.totalRevenue || 0
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getDashboard };

