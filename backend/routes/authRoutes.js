import express from "express";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
//  Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/me", verifyToken, getCurrentUser);

// router.get("/alluser", getalluser);
// router.put("/update/:id", updateuser);
// router.delete("/delete/:id", deleteuser);

export default router;
