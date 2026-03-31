import express from "express";
import post from "../models/Post.js";
import protect from "../middleware/authMiddleware.js";
import { createPost, getPosts } from "../controllers/postController.js";

const router = express.Router();

//create a post 📝
router.post("/create", protect, createPost);

//get all posts ✅
router.get("/", protect, getPosts);

export default router;
