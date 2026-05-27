import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import { uploadFile } from "./services/storageServices.js";
import Post from "./models/postModel.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // multer instance for handling file uploads

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

/* ---------------- MONGODB CONNECTION ---------------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ---------------- CREATE POST ---------------- */

app.post("/api/posts", upload.single("image"), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const result = await uploadFile(req.file.buffer);

    const newPost = new Post({
      title,
      description,
      image: result.url,
      category,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ---------------- GET ALL POSTS ---------------- */

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get posts by category

app.get("/api/posts/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const posts = await Post.find({ category }).sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single post by ID
app.get("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete post by ID
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/posts/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description, category },
      { returnDocument: "after" },
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
