import express from "express";
import post from "../models/Post.js";
import protect from "../middleware/authMiddleware.js";
import { createPost, getPosts } from "../controllers/postController.js";
import { likePost } from "../controllers/postController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

//create a post 📝
router.post("/create", protect, upload.single("image"), createPost);

//get all posts ✅
router.get("/", protect, getPosts);

//likes
router.put("/like/:id", protect, likePost);

export default router;
