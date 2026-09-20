import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// @route   GET /api/users/profile  (Get logged in user profile)
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

// @route   PUT /api/users/profile  (Update user profile)
router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.bio = req.body.bio || user.bio;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      bio: updatedUser.bio,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
