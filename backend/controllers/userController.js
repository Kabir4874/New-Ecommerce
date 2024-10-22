import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import createToken from "../utils/createToken.js";

export const createUser = asyncHandler(async (req, res) => {
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
    createToken(res, newUser._id);
    res.status(201).json({ newUser, message: "User created successfully" });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) res.status(400).send("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(400).send("Password don't match");
  }
  createToken(res, user._id);
  res.status(201).json({ message: "Login successfully" });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(201).json({ message: "Logout successfully" });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isAdmin: false });
  if (users.length === 0) {
    res.status(400).send("Users not found");
  }
  res.status(201).json({ users });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) res.status(400).send("User not found");
  res.status(201).json({ user });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) res.status(400).send("User not found");
  user.username = req.body.username || user.username;
  const updatedUser = await user.save();
  res.status(201).json({ updatedUser });
});

export const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) res.status(400).send("User not found");
  if (user && user.isAdmin) {
    res.status(400);
    throw new Error("Cannot delete admin user");
  }
  await User.deleteOne({ _id: user._id });
  res.json({ message: "User removed" });
});

export const getUserById= asyncHandler(async(req,res)=>{
  console.log(req.params.id);
})