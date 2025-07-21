import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

function Jobdescription() {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setIsApplied] = useState(false);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 my-10">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-xl sm:text-2xl">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg w-full sm:w-auto ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Applied" : "Apply now"}
        </Button>
      </div>

      {/* Job Description */}
      <div className="border-b-2 border-b-gray-300 font-medium text-base py-4">
        {singleJob?.description}
      </div>

      {/* Details Section */}
      <div className="my-6 space-y-3 text-sm sm:text-base">
        <div>
          <span className="font-bold">Role:</span>
          <span className="pl-2 text-gray-800">{singleJob?.title}</span>
        </div>
        <div>
          <span className="font-bold">Location:</span>
          <span className="pl-2 text-gray-800">{singleJob?.location}</span>
        </div>
        <div>
          <span className="font-bold">Description:</span>
          <span className="pl-2 text-gray-800">{singleJob?.description}</span>
        </div>
        <div>
          <span className="font-bold">Experience:</span>
          <span className="pl-2 text-gray-800">{singleJob?.experienceLevel}</span>
        </div>
        <div>
          <span className="font-bold">Salary:</span>
          <span className="pl-2 text-gray-800">{singleJob?.salary} LPA</span>
        </div>
        <div>
          <span className="font-bold">Total Applicants:</span>
          <span className="pl-2 text-gray-800">{singleJob?.applications?.length}</span>
        </div>
        <div>
          <span className="font-bold">Posted Date:</span>
          <span className="pl-2 text-gray-800">
            {new Date(singleJob?.createdAt).toDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Jobdescription;
