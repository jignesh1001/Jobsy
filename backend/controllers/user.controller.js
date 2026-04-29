import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { logMessage } from "../utils/log.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    // Validation checks
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Fullname validation (2-50 characters)
    if (fullname.trim().length < 2 || fullname.trim().length > 50) {
      return res.status(400).json({
        message: "Fullname must be between 2 and 50 characters",
        success: false,
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
      });
    }

    // Phone number validation (10-15 digits)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phoneNumber.toString())) {
      return res.status(400).json({
        message: "Phone number must be 10-15 digits",
        success: false,
      });
    }

    // Password validation (min 6 chars)
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
        success: false,
      });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "Profile photo is required",
        success: false,
      });
    }

    // File type validation
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({
        message: "Only JPEG, PNG, and WebP images are allowed",
        success: false,
      });
    }

    // File size validation (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return res.status(400).json({
        message: "File size should not exceed 5MB",
        success: false,
      });
    }

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    logMessage(fullname + "'s Account created Successfully");
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Registration failed. Please try again.",
      success: false,
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validation checks
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Check role is correct
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with selected role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    logMessage(user.fullname + " logged in successfully");
    return res.status(200).cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    }).json({
      message: `Welcome back ${user.fullname}`,
      user,
      success: true,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Login failed. Please try again.",
      success: false,
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      message: "Logout failed",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "No file uploaded",
        success: false,
      });
    }

    // Validation checks
    if (fullname && (fullname.trim().length < 2 || fullname.trim().length > 50)) {
      return res.status(400).json({
        message: "Fullname must be between 2 and 50 characters",
        success: false,
      });
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          message: "Invalid email format",
          success: false,
        });
      }
    }

    if (phoneNumber) {
      const phoneRegex = /^[0-9]{10,15}$/;
      if (!phoneRegex.test(phoneNumber.toString())) {
        return res.status(400).json({
          message: "Phone number must be 10-15 digits",
          success: false,
        });
      }
    }

    // File type validation
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({
        message: "Only images (JPEG, PNG, WebP) and PDF files are allowed",
        success: false,
      });
    }

    // File size validation (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return res.status(400).json({
        message: "File size should not exceed 5MB",
        success: false,
      });
    }

    // Cloudinary upload
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",").map((skill) => skill.trim()).filter((skill) => skill.length > 0);
    }

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Update data
    if (fullname) user.fullname = fullname;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (email) user.email = email;
    if (skills) user.profile.skills = skillsArray;

    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    logMessage(user.fullname + "'s profile updated");
    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      message: "Profile update failed. Please try again.",
      success: false,
      error: error.message,
    });
  }
};
