import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import { addComment, deleteComment, updateComment } from "../controllers/commentController.js";

const router = express.Router();
//  Comment routes
router.post("/:postId", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);

router.put("/:id", verifyToken, updateComment);
router.delete("/:id", verifyToken, deleteComment);

export default router;
