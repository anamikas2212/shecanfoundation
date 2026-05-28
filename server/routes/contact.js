import express from "express";
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
  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: "Form submitted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

export default router;
