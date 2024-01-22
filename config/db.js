const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {});

  console.log(`MongoseDB connected: ${conn.connection.host}`.brightCyan);
};

module.exports = connectDB;
