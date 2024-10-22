import express from "express";
import {
  createUser,
  getAllUsers,
  getUserProfile,
  loginUser,
  logoutUser,
  updateUserProfile
} from "../controllers/userController.js";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/get-all", authenticate, authorizedAdmin, getAllUsers);
router
  .route("/profile")
  .get(authenticate, getUserProfile)
  .put(authenticate, updateUserProfile);
export default router;
