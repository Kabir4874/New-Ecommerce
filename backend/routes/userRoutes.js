import express from "express";
import {
  createUser,
  getAllUsers,
  getUserProfile,
  loginUser,
  logoutUser,
  updateUserProfile,
  deleteUserById,
  getUserById
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

  router.route('/:id').delete(authenticate,authorizedAdmin,deleteUserById).get(authenticate,authorizedAdmin,getUserById)
export default router;
