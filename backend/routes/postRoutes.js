import express from "express";
import {
  verifyToken,
  allowSelfOrAdmin,
  authorizeRoles,
} from "../middleware/verifyToken.js";

import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  updatePost,
  getMyPosts,
} from "../controllers/postController.js";

import upload from "../middleware/multer.js";

const router = express.Router();
//  Post routes
router.get("/", getAllPosts);
router.get("/user/me", verifyToken, getMyPosts);
router.get("/:id", getPostById);
router.post("/", verifyToken, upload.single("image"), createPost);
router.put("/:id", verifyToken, upload.single("image"), updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;
