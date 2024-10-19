import express from "express";
import {
  createUser,
  getAllUsers,
  loginUser,
  logoutUser,
  getUserProfile,
} from "../controllers/userController.js";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/get-all-users", authenticate, authorizedAdmin, getAllUsers);
router.get('/user-profile', authenticate,getUserProfile)
export default router;
