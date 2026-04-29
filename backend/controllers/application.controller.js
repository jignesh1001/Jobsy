import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { logMessage } from "../utils/log.js";

// Student - Apply for a job
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false,
      });
    }

    // Check if the user has already applied for this job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // Get company name
    const companyId = job.company;
    const companyName = await Company.findById(companyId);
    if (!companyName) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    // Create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    logMessage(`User ${userId} applied for job "${job.title}" at ${companyName.name}`);
    return res.status(201).json({
      message: `You have successfully applied for ${job.title} at ${companyName.name}`,
      success: true,
    });
  } catch (error) {
    console.error("Apply job error:", error);
    return res.status(500).json({
      message: "Failed to apply for job. Please try again.",
      success: false,
      error: error.message,
    });
  }
};

// Student - Get applied jobs
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    const currentUser = await User.findById(userId);

    return res.status(200).json({
      currentUser,
      applicationCount: applications.length,
      applications,
      success: true,
    });
  } catch (error) {
    console.error("Get applied jobs error:", error);
    return res.status(500).json({
      message: "Failed to fetch applied jobs",
      success: false,
      error: error.message,
    });
  }
};

// Admin - Get applicants for a job
export const getApplicants = async (req, res) => {
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
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
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
    console.error("Get applicants error:", error);
    return res.status(500).json({
      message: "Failed to fetch applicants",
      success: false,
      error: error.message,
    });
  }
};

// Admin - Update application status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    // Validate status value
    const validStatuses = ["pending", "accepted", "rejected"];
    if (!validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        message: "Invalid status. Must be pending, accepted, or rejected",
        success: false,
      });
    }

    if (!applicationId) {
      return res.status(400).json({
        message: "Application ID is required",
        success: false,
      });
    }

    // Find application by ID
    const application = await Application.findOne({ _id: applicationId });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    const oldStatus = application.status;

    // Update status
    application.status = status.toLowerCase();
    application.updatedAt = Date.now();
    await application.save();

    logMessage(`Application ${applicationId} status changed from ${oldStatus} to ${status}`);
    return res.status(200).json({
      message: "Status updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Update status error:", error);
    return res.status(500).json({
      message: "Failed to update status. Please try again.",
      success: false,
      error: error.message,
    });
  }
};
