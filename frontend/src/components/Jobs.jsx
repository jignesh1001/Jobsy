 
import FilterCard from "./FilterCard";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];
// const jobsArray = [];

const Jobs = () => {
  const {allJobs} = useSelector(store => store.job);
  console.log(allJobs);
  return (
    <div> 
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">  
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>

          {allJobs.length == 0 ? (
            <span>Job Not found</span>) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {allJobs.map((job) => (
                   <div key={job?._id}>
                    <Job job={job}/>
                  </div>
                ))}
              </div>
            </div> 
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
