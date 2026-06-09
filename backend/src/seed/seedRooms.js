const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Room = require("../models/Room");

dotenv.config();

const rooms = [
  {
    roomNumber: "101",
    roomType: "Deluxe",
    pricePerNight: 2800,
    capacity: 2,
    description: "A stylish deluxe room with city views, queen bed, work desk, and premium linen.",
    imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    roomNumber: "102",
    roomType: "Deluxe",
    pricePerNight: 3000,
    capacity: 2,
    description: "Comfortable deluxe room designed for couples and business travellers.",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
  },
  {
    roomNumber: "201",
    roomType: "Suite",
    pricePerNight: 5200,
    capacity: 4,
    description: "Spacious suite with separate lounge area, king bed, and luxury bathroom.",
    imageUrl: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80"
  },
  {
    roomNumber: "202",
    roomType: "Suite",
    pricePerNight: 6000,
    capacity: 4,
    description: "Premium suite for families with extra space and refined interiors.",
    imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
  },
  {
    roomNumber: "301",
    roomType: "Standard",
    pricePerNight: 1800,
    capacity: 2,
    description: "Clean and efficient standard room with all essential amenities.",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    roomNumber: "401",
    roomType: "Executive",
    pricePerNight: 4200,
    capacity: 3,
    description: "Executive room with elegant furnishing, high-speed workspace, and breakfast included.",
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
  }
];

const seedRooms = async () => {
  try {
    await connectDB();
    await Room.deleteMany({});
    await Room.insertMany(rooms);
    console.log("Room seed data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedRooms();

