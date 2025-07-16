import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import {Badge} from './ui/badge';
import test from "../assets/default.jpg";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const Job = ({job}) => {
  const navigate = useNavigate()  
  
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const now = new Date();
    const diffDays = now - createdAt;
    return Math.floor(diffDays / (1000 * 60 * 60 * 24));
  };
  if (!job) {
    return ('null')
  }
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar className="h-10 w-10">
            <AvatarImage src={test} />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name} <sup className="text-[#6A38C2] text-xs">verified</sup></h1>
          <p className='text-sm text-gray-500'>India</p>
        </div> 
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-grey-600">
        {job?.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
            <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary} LPA</Badge>
        </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button onClick={()=> navigate(`/description/${job?._id}`)} variant='outline'>Details</Button>
        <Button className='bg-[#7209b7]'>Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
