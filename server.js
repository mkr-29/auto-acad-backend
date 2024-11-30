const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/users.model");
const app = express();

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello root");
});

// route files
const user = require("./routes/user/user");
// const admin = require("./routes/admin/admin");

// use routes
app.use("/user", user);

const port = process.env.PORT || 3000;

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({ user });
  } catch {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://mkr-27:AmM7teMsjt1qtud2@userdb.5vxxh.mongodb.net/?retryWrites=true&w=majority&appName=UserDB"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
