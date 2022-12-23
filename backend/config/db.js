const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MANGO_URI);
    console.log(`Mongo Bd connected : ${conn.connection.host}`.cyan.underline);
  } catch (e) {
    console.log("Err" + e);
    process.exit(1);
  }
};

module.exports = connectDb;
