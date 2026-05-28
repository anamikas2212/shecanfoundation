import express from "express";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  // If MongoDB is not connected, use local file fallback
  if (mongoose.connection.readyState !== 1) {
    try {
      const backupDir = "./backups";
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir);
      }
      const filePath = path.join(backupDir, "submissions.json");
      let submissions = [];
      if (fs.existsSync(filePath)) {
        const rawData = fs.readFileSync(filePath, "utf-8");
        submissions = JSON.parse(rawData);
      }
      const newSubmission = { name, email, message, createdAt: new Date() };
      submissions.push(newSubmission);
      fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), "utf-8");

      console.log(`[Backup Mode] Submission received from ${email} and saved to local JSON.`);
      return res.status(201).json({
        message: "Form submitted successfully (saved to local backup as MongoDB is offline).",
        data: newSubmission
      });
    } catch (fsErr) {
      console.error("Local backup write failed:", fsErr);
      return res.status(500).json({ error: "Server error. Failed to save submission." });
    }
  }

  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: "Form submitted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

export default router;
