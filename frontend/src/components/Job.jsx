import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from './ui/badge';
import test from "../assets/default.jpg";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const now = new Date();
    const diffDays = now - createdAt;
    return Math.floor(diffDays / (1000 * 60 * 60 * 24));
  };

  if (!job) {
    return 'null';
  }

  return (
    <div className="p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-100 flex flex-col justify-between h-full">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <p className='text-xs sm:text-sm text-gray-500'>
          {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark size={16} />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 my-3">
        <Button className="p-0" variant="outline" size="icon">
          <Avatar className="h-10 w-10">
            <AvatarImage src={test} />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-base sm:text-lg'>
            {job?.company?.name} <sup className="text-[#6A38C2] text-xs">verified</sup>
          </h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>

      {/* Title and Description */}
      <div>
        <h1 className="font-bold text-base sm:text-lg mb-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} Positions</Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary} LPA</Badge>
      </div>

      {/* Action Buttons */}
      <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4'>
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant='outline' className="w-full sm:w-auto">
          Details
        </Button>
        <Button className='bg-[#7209b7] w-full sm:w-auto'>Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
