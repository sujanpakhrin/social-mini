import express from "express";
import post from "../models/Post.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

//create a post 📝
router.post("/", protect, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }
    const post = await post.create({
      userId: req.user._id,
      text,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all posts ✅
router.get("/", protect, async (req, res) => {
  try {
    const posts = await post
      .find()
      .sort({ createdAt: -1 })
      .populate("userId", "name");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
