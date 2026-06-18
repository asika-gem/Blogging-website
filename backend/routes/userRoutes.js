import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import {
  verifyToken,
  allowSelfOrAdmin,
  authorizeRoles,
} from "../middleware/verifyToken.js";

const router = express.Router();
// Get all users (admin only)
router.get("/", verifyToken, authorizeRoles("admin"), getUsers);
// Get user by ID (self or admin)
router.get("/:id", verifyToken, allowSelfOrAdmin, getUserById);
// Update user profile (self or admin)
router.put("/:id", verifyToken, allowSelfOrAdmin, updateUser);
// Delete user (admin only)
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteUser);

export default router;
