const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../Model/userModel");
require("dotenv").config();

const userRoute = express.Router();

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { userID: user._id, userName: user.firstName, userEmail: user.email },
    process.env.JWT_SECRET || "1234"
  );
};

// POST /register - User registration
userRoute.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "Incomplete User Details" });
    }

    // Check if user already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User Already Registered" });
    }

    // Validate password strength
    if (
      !/[A-Z]/.test(password) ||
      !/[1-9]/.test(password) ||
      !/[!@#$%^&*_?":]/.test(password) ||
      password.length < 8
    ) {
      return res.status(401).json({
        error: "Password must have One uppercase, One number, and One Special Character",
      });
    }

    // Create a new user
    const user = new UserModel({ email, firstName, lastName });
    const hash = await bcrypt.hash(password, 10); // Hash the password
    user.password = hash;

    // Save user to the database
    await user.save();
    res.status(201).json({ message: "User Successfully Registered", user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /login - User login
userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please Provide Email and Password" });
    }

    // Find user in the database
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(402).json({ error: "User Does Not Exist" });
    }

    // Compare provided password with stored hash
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({ error: "Invalid Password" });
    }

    const token = generateToken(user);
    res.json({
      message: "User Successfully Logged In",
      token,
      firstName: user.firstName,
      lastName: user.lastName,
      userEmail: user.email,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PATCH /update - Update user information
userRoute.patch("/update", async (req, res) => {
  try {
    const { userId, firstName, lastName, email } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { firstName, lastName, email },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /info - Get user information
userRoute.get("/info", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "1234"); // Verify token

    let user;
    if (decoded.googleId) {
      user = await UserModel.findOne({ googleId: decoded.googleId });
    } else {
      user = await UserModel.findById(decoded.userID);
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// POST /auth-google - Google authentication
userRoute.post("/auth-google", async (req, res) => {
  const { googleId, firstName, lastName, email, avatar } = req.body;

  try {
    let user = await UserModel.findOne({ email });

    // Create a new user if not found
    if (!user) {
      user = new UserModel({
        googleId,
        firstName,
        lastName,
        email,
        avatar,
      });
      await user.save();
    }

    const token = generateToken(user);
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: "Google authentication failed", error });
  }
});

module.exports = userRoute;
