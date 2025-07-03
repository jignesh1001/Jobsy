import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import {User} from "../models/user.model.js"
import { Company } from "../models/company.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job Id is required",
        success: false,
      });
    }
    // check if the user has already applied for the job

    const existingAppplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingAppplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }
    //check if the job exists

    const job = await Job.findById(jobId);
    const companyId = job.company
    const companyName = await Company.findById(companyId)
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // create a new application

    const newApplication = await Application.create({
        job:jobId,
        applicant:userId,
    })
    job.applications.push(newApplication._id)
    await job.save()

    return res.status(201).json({
      message:`You have successfully applied for ${job.title} at ${companyName.name}`,
      success : true
    })
  } catch (error) {
    console.log(error);
  }
};


export const getAppliedJobs = async (req,res) =>{
  try {
    const userId =  req.id;
    const currentUser = await User.findById(userId);
    const application = await Application.find({applicant:userId}).sort({createdAt :-1}).populate({
      path:'job',
      options :{sort:{createdAt:-1}},
      populate:{
        path :'company',
        options :{sort:{createdAt:-1}}
      }
    })
    if(!application){
      return res.status(404).json({
        message:"No Applications",
        success:false
      })
    }

    return res.status(200).json({
      currentUser,
      applicationCount : application.length,
      application,
      success:true
    })
  } catch (error) {
    console.log(error)
  }
}

// for admin 
export const getApplicants = async(req,res) =>{
     try {
       const jobId = req.params.id;
       const job = await Job.findById(jobId).populate({
        path:'applications',
        options:{sort:{createdAt:-1}},
        populate:{
            path : 'applicant'
        }
       })
       if(!job){
          return res.status(404).json({
               message:'Job not found.',
               success:false
          })
       }
      
       return res.status(200).json({
          job,
          success:true
       });
     } catch (error) {
      console.log(error)
     }
}


export const updateStatus = async (req,res) =>{
  try {
    const {status} = req.body;
    const applicationId = req.params.id;
    if(!status){
      return res.status(400).json({
        message:'Status is required',
        success:false
   })
    }

    // find application by applicantion id
    const application = await Application.findOne({_id:applicationId})
    
    if(!application){
      return res.status(404).json({
        message:"Application not found",
        success:false
      })
    }

    // update status
    application.status = status.toLowerCase()
    await application.save()

    return res.status(200).json({
      message:"Status updated Successfully",
      success:true
    })
    
  } catch (error) {
    console.log(error)
  }
}