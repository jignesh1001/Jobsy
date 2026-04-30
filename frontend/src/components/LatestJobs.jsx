import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs, loading } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left">
        <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-100 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {allJobs.length !== 0 ? (
            allJobs.map((job) => <LatestJobCards key={job._id} job={job} />)
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 text-lg">No job openings available at the moment</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LatestJobs;
