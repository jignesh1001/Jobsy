import FilterCard from "./FilterCard";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { setSearchedQuery } from "@/redux/jobSlice";

const Jobs = () => {
  const { allJobs, searchedQuery, loading } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filtereddJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilteredJobs(filtereddJobs);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Sidebar Filter */}
          <div className="lg:w-1/4 w-full">
            <FilterCard />
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7209b7] mx-auto"></div>
                  <p className="text-gray-500 mt-4">Loading jobs...</p>
                </div>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500 text-lg">No jobs found matching your criteria</p>
              </div>
            ) : (
              <div className="h-[88vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredJobs.map((job) => (
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      key={job?._id}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
