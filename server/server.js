const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // ✅ Add this

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Match your frontend
    credentials: true,               // ✅ Needed for cookies
  })
);

app.use(express.json());
app.use(cookieParser()); // ✅ Add this before routes

// Connect DB
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/boards", require("./routes/boardRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes")); // likely protected by auth middleware

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
