import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob, updateJob } from "../controllers/job.controller.js";

const router = express.Router()

router.route("/post").post(isAuthenticated,postJob);
// no authentication is needed. when a user first lands on index page it needs to see all 
// the joblistings without being authenticated 
router.route("/get").get(getAllJobs); 
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/update/:id").put(isAuthenticated,updateJob);

export default router;