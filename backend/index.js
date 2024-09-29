const express = require("express");
const connectToServer = require("./Config/db");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const userRoute = require("./Routes/userRoute");
const app = express();
const cors = require("cors");
const taskRoute = require("./Routes/taskRoute");
const avatarUpload = require("./Routes/avatarUpload")

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "your_secret_key", 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
  })
);

app.use(passport.initialize());
app.use(passport.session()); 

app.get("/", (req, res) => {
  res.send("Welcome To My Backend");
});

app.use("/user", userRoute);

app.use("/task", taskRoute);

app.use("/upload", avatarUpload);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
  connectToServer();
});
