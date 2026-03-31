import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }
    const post = await Post.create({
      userId: req.user._id,
      text,
    });
    res.status(201).json(post, { message: "Post created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
