const mongoose = require("mongoose");

async function connectToMongoDB() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/mern_project"
    );
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
  }
}

connectToMongoDB();
