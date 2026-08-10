import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    const image = req.file ? req.file.path : null;
    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }
    const post = await Post.create({
      userId: req.user._id,
      text,
      image,
    });
    res.status(201).json(post, { message: "Post created successfully!" });
    console.log(req.body);
    console.log(req.file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
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

export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const alreadyLiked = post.likes.some(
    (id) => id.toString() === req.user._id.toString(),
  );

  if (alreadyLiked) {
    post.likes = post.likes.filter(
      (id) => id.toString() !== req.user._id.toString(),
    );
  } else {
    post.likes.push(req.user._id);
  }
  await post.save();
  const updatedPost = await Post.findById(post._id)
    .populate("userId", "name")
    .populate("comments.userId", "name");

  res.json(updatedPost);
};
