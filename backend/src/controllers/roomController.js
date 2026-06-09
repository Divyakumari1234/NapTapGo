const Room = require("../models/Room");

const getRooms = async (req, res, next) => {
  try {
    const { type, capacity, maxPrice, page = 1, limit = 10, sort } = req.query;
    const filter = {};

    if (type) {
      filter.roomType = new RegExp(`^${type}$`, "i");
    }

    if (capacity) {
      filter.capacity = { $gte: Number(capacity) };
    }

    if (maxPrice) {
      filter.pricePerNight = { $lte: Number(maxPrice) };
    }

    const pageNumber = Math.max(Number(page) || 1, 1);
    const pageSize = Math.min(Math.max(Number(limit) || 10, 1), 50);
    const sortOption = sort === "price" ? { pricePerNight: 1 } : { createdAt: -1 };

    const [rooms, total] = await Promise.all([
      Room.find(filter)
        .sort(sortOption)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize),
      Room.countDocuments(filter)
    ]);

    return res.json({
      rooms,
      pagination: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) {
    return next(error);
  }
};

const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    return res.json(room);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getRoomById, getRooms };

