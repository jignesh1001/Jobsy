import { useParams } from "react-router-dom"
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";

function Jobdescription() {
  const isApplied = true;
  const params = useParams();
  const jobId = params.id;
  const {singleJob} = useSelector(store => store.job)
  const {user} = useSelector(store => store.auth)
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchSingleJob = async () => {
        try{
           const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true})
           if(res.data.success){
              dispatch(setSingleJob(res.data.jobs))
           }
           if(res.data.success){
             console.log(res.data)
           }
        }catch(error){
           console.log(error)
        }
    }
    fetchSingleJob();

  },[jobId,dispatch,user?._id])
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex item-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
               {singleJob?.jobType}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Applied" : "Apply now"}
        </Button>
      </div>
          <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
            {singleJob?.description}
          </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">Role:<span className="pl-4 font-normal text-gray-800">Frontend Developer</span></h1>
        <h1 className="font-bold my-1">Location:<span className="pl-4 font-normal text-gray-800">Hydrabad</span></h1>
        <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo!</span></h1>
        <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">2 yrs</span></h1>
        <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">24LPA</span></h1>
        <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">4</span></h1>
        <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">23/06/2025</span></h1>
  </div>
    </div>
  );
}

export default Jobdescription;
