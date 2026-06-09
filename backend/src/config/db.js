const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error();
  }

  await mongoose.connect(mongoUri);
  console.log("Database connected successfully");
};

module.exports = connectDB;
