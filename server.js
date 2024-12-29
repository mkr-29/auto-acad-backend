const express = require("express");
const dontenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { restrictToLoggedInUserOnly } = require("./middlewares/auth");

// routes
const userRoutes = require("./routes/users/users.route");
// const authRoutes = require("./routes/auth/auth.route");

// Load env variables
dontenv.config();

// Connect to MongoDB
connectDB();

// Create an express app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// cors
app.use(cors({
  origin: process.env.FRONTEND_URI, // Replace with your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // Allow cookies or credentials if needed
}));

// user routes
app.use("/api/users", userRoutes);
// app.use("/auth", authRoutes); // Use the /auth route for authenticatio

// server
const PORT = process.env.PORT || 5300;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);