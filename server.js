const express = require("express");
const dontenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { restrictToLoggedInUserOnly } = require("./middlewares/auth");

// routes
const userRoutes = require("./routes/users/users.route");
// const authRoutes = require("./routes/auth/auth.route");
const studentRoutes = require("./routes/students/students.route");
const collegeRoutes = require("./routes/college/college.route");
const subjectRoutes = require("./routes/subjects/subjects.route");
const parentRoutes = require("./routes/parents/parents.route");
const emailRoutes = require("./routes/emails/emails.route");

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
// student routes
app.use("/api/students", restrictToLoggedInUserOnly, studentRoutes);
// college routes
app.use("/api/college", restrictToLoggedInUserOnly, collegeRoutes);
// subjects routes
app.use("/api/subject", restrictToLoggedInUserOnly, subjectRoutes);
// parent routes
app.use("/api/parents", restrictToLoggedInUserOnly, parentRoutes);
// email routes
app.use("/api/emails", restrictToLoggedInUserOnly, emailRoutes);

// server
const PORT = process.env.PORT || 5300;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);