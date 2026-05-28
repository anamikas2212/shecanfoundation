import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
    methods: ["POST"],
  }),
);

app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

// Root
app.get("/", (req, res) => {
  res.send("She Can Foundation Backend Running");
});

// MongoDB connection with dynamic background retry/reconnect
const connectWithRetry = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Quick 5-second check
    })
    .then(() => {
      console.log("Connected to MongoDB successfully! All contact form submissions will now write to the database.");
    })
    .catch((err) => {
      console.warn("MongoDB connection failed. Will check again in 10 seconds. Running in Local Backup mode.");
      setTimeout(connectWithRetry, 10000); // Retry every 10s
    });
};

connectWithRetry();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

