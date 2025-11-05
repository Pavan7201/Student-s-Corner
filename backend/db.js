const mongoose = require("mongoose");

const url = process.env.DATABASE_URL;

module.exports.connect = () => {
  // Exit if the database URL is not set
  if (!url) {
    console.error("Error: MongoDB connection string (DATABASE_URL) is not defined in your environment variables.");
    process.exit(1);
  }

  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.log("Error connecting to MongoDB: ", err));
};
