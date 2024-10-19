import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("User already exists");
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
export { createUser };
