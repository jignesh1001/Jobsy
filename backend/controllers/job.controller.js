import { Job } from "../models/job.model.js";
import { logMessage } from "../utils/log.js";

// Admin - Create new job
export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
    const userId = req.id;

    // Validation checks
    if (!title || !description || !salary || !location || !jobType || !experience || !position || !companyId) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Title validation
    if (title.trim().length < 3 || title.trim().length > 100) {
      return res.status(400).json({
        message: "Job title must be between 3 and 100 characters",
        success: false,
      });
    }

    // Description validation
    if (description.trim().length < 10) {
      return res.status(400).json({
        message: "Job description must be at least 10 characters",
        success: false,
      });
    }

    // Salary validation
    const salaryNum = Number(salary);
    if (isNaN(salaryNum) || salaryNum <= 0) {
      return res.status(400).json({
        message: "Salary must be a positive number",
        success: false,
      });
    }

    // Position validation
    const positionNum = Number(position);
    if (isNaN(positionNum) || positionNum < 1 || positionNum > 100) {
      return res.status(400).json({
        message: "Position must be between 1 and 100",
        success: false,
      });
    }

    // Experience level validation
    const experienceNum = Number(experience);
    if (isNaN(experienceNum) || experienceNum < 0 || experienceNum > 50) {
      return res.status(400).json({
        message: "Experience level must be between 0 and 50 years",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements ? requirements.split(",").map((r) => r.trim()).filter((r) => r.length > 0) : [],
      salary: salaryNum,
      location,
      jobType,
      experienceLevel: experienceNum,
      position: positionNum,
      company: companyId,
      created_by: userId,
    });

    logMessage(`New job "${title}" created by user ${userId}`);
    return res.status(201).json({
      message: "New job created successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.error("Post job error:", error);
    return res.status(500).json({
      message: "Failed to create job. Please try again.",
      success: false,
      error: error.message,
    });
  }
};

// Get all jobs with search
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query).populate({
      path: "company",
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      jobCount: jobs.length,
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Get all jobs error:", error);
    return res.status(500).json({
      message: "Failed to fetch jobs",
      success: false,
      error: error.message,
    });
  }
};

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false,
      });
    }

    const job = await Job.findById(jobId).populate({
      path: "applications",
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.error("Get job by ID error:", error);
    return res.status(500).json({
      message: "Failed to fetch job details",
      success: false,
      error: error.message,
    });
  }
};

// Update job
export const updateJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, experienceLevel, position } = req.body;

    // Validation checks
    if (title && (title.trim().length < 3 || title.trim().length > 100)) {
      return res.status(400).json({
        message: "Job title must be between 3 and 100 characters",
        success: false,
      });
    }

    if (description && description.trim().length < 10) {
      return res.status(400).json({
        message: "Job description must be at least 10 characters",
        success: false,
      });
    }

    if (salary !== undefined) {
      const salaryNum = Number(salary);
      if (isNaN(salaryNum) || salaryNum <= 0) {
        return res.status(400).json({
          message: "Salary must be a positive number",
          success: false,
        });
      }
    }

    if (position !== undefined) {
      const positionNum = Number(position);
      if (isNaN(positionNum) || positionNum < 1 || positionNum > 100) {
        return res.status(400).json({
          message: "Position must be between 1 and 100",
          success: false,
        });
      }
    }

    if (experienceLevel !== undefined) {
      const expNum = Number(experienceLevel);
      if (isNaN(expNum) || expNum < 0 || expNum > 50) {
        return res.status(400).json({
          message: "Experience level must be between 0 and 50 years",
          success: false,
        });
      }
    }

    const updateData = {
      title,
      description,
      requirements,
      salary: salary ? Number(salary) : undefined,
      location,
      jobType,
      experienceLevel: experienceLevel ? Number(experienceLevel) : undefined,
      position: position ? Number(position) : undefined,
    };

    // Remove undefined fields
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const job = await Job.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    logMessage(`Job "${job.title}" updated`);
    return res.status(200).json({
      message: "Job updated successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.error("Update job error:", error);
    return res.status(500).json({
      message: "Failed to update job. Please try again.",
      success: false,
      error: error.message,
    });
  }
};

// Get admin jobs (jobs created by logged-in user)
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Get admin jobs error:", error);
    return res.status(500).json({
      message: "Failed to fetch jobs",
      success: false,
      error: error.message,
    });
  }
};
