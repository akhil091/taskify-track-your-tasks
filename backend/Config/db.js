// Import mongoose for MongoDB interaction
const mongoose = require('mongoose');

// Load environment variables from the .env file
require('dotenv').config();

// Asynchronous function to connect to MongoDB
const connectToServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);  // Exit the process to indicate failure
    }
};

module.exports = connectToServer;
