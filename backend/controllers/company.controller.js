import { Company } from "../models/company.model.js";
import { logMessage } from "../utils/log.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register a new company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    // Validation checks
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    // Company name validation (3-100 characters)
    if (companyName.trim().length < 3 || companyName.trim().length > 100) {
      return res.status(400).json({
        message: "Company name must be between 3 and 100 characters",
        success: false,
      });
    }

    const userId = req.id;

    // Check if company already exists
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register the same company",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId,
    });

    logMessage(`Company "${companyName}" registered by user ${userId}`);
    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Register company error:", error);
    return res.status(500).json({
      message: "Failed to register company. Please try again.",
      success: false,
      error: error.message,
    });
  }
};

// Get all companies for logged-in user
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No companies found",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error("Get company error:", error);
    return res.status(500).json({
      message: "Failed to fetch companies",
      success: false,
      error: error.message,
    });
  }
};

// Get company by ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    if (!companyId) {
      return res.status(400).json({
        message: "Company ID is required",
        success: false,
      });
    }

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.error("Get company by ID error:", error);
    return res.status(500).json({
      message: "Failed to fetch company details",
      success: false,
      error: error.message,
    });
  }
};

// Update company
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "Company logo is required",
        success: false,
      });
    }

    // Validation checks
    if (name && (name.trim().length < 3 || name.trim().length > 100)) {
      return res.status(400).json({
        message: "Company name must be between 3 and 100 characters",
        success: false,
      });
    }

    if (description && description.trim().length < 10) {
      return res.status(400).json({
        message: "Description must be at least 10 characters",
        success: false,
      });
    }

    // Website URL validation
    if (website) {
      const urlRegex = /^https?:\/\/.+/;
      if (!urlRegex.test(website)) {
        return res.status(400).json({
          message: "Invalid website URL. Must start with http:// or https://",
          success: false,
        });
      }
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

    // Cloudinary upload
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    logMessage(`Company "${name}" information updated`);
    return res.status(200).json({
      message: "Company information updated",
      success: true,
    });
  } catch (error) {
    console.error("Update company error:", error);
    return res.status(500).json({
      message: "Failed to update company. Please try again.",
      success: false,
      error: error.message,
    });
  }
};
