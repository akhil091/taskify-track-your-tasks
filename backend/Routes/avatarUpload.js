const express = require("express");
const multer = require("multer"); // Multer is used for handling file uploads
const cloudinary = require("cloudinary").v2; // Cloudinary for handling image storage in the cloud
const { CloudinaryStorage } = require("multer-storage-cloudinary"); // Multer storage setup for Cloudinary
require('dotenv').config();
const UserModel = require("../Model/userModel");

const imageRoute = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary storage for uploaded images
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "user_images", // folder in Cloudinary where images will be stored
        allowed_formats: ["jpg", "png", "jpeg"]
    }
});

// Configure multer to use the Cloudinary storage
const upload = multer({ storage: storage });

// Route to upload an avatar image for a user
imageRoute.post("/avatar", upload.single("image"), async (req, res) => {
    try {
        const userId = req.body.userId;
        const imageUrl = req.file.path;

        const user = await UserModel.findByIdAndUpdate(userId, { avatar: imageUrl }, { new: true });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "Image uploaded successfully", user });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = imageRoute;
