import postModel from "../models/postModel.js";
import commentModel from "../models/commentModel.js";
import { uploadFile } from "../services/storageServices.js";

// GET POST BY ID
export const getPostById = async (req, res) => {
  try {
    const post = await postModel
      .findById(req.params.id)
      .populate("author", "username")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username",
        },
      });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE POST
export const createPost = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    let imageUrl = null;

    if (req.file) {
      const result = await uploadFile(req.file.buffer, req.file.originalname);
      imageUrl = result.url;
    }

    const newPost = new postModel({
      title,
      description,
      category,
      published: true,
      image: imageUrl,
      author: req.user.id,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await postModel
      .find({ author: userId })
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL POSTS
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find({ published: true })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE POST (OWNER OR ADMIN)
export const updatePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isOwner = post.author.toString() === req.user.id?.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // handle image update
    if (req.file) {
      const result = await uploadFile(req.file.buffer, req.file.originalname);
      req.body.image = result.url;
    }

    const updatedPost = await postModel.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        published: req.body.published,
        image: req.body.image,
      },
      { new: true },
    );

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE POST (OWNER OR ADMIN)
export const deletePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    console.log("REQ USER:", req.user);
    console.log("POST AUTHOR:", post.author.toString());
    console.log(
      "IS OWNER:",
      post.author.toString() === req.user.id?.toString(),
    );
    console.log("IS ADMIN:", req.user.role === "admin");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isOwner = post.author.toString() === req.user.id?.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

