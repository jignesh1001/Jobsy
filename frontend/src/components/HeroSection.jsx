import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base">
          No. 1 Job Hunt Website
        </span>

        <motion.h1
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 12,
            duration: 0.9,
          }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
        >
          Search, Apply &<br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </motion.h1>

        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quia pariatur itaque accusantium corporis!
        </p>

        <motion.div
          className="flex w-full sm:w-[90%] md:w-[60%] lg:w-[40%] mx-auto border shadow-lg border-gray-200 pl-3 rounded-full items-center gap-2"
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 12,
            duration: 0.9,
          }}
        >
          <input
            type="text"
            placeholder="Find Your Dream Job"
            className="outline-none border-none w-full py-3 px-2 text-sm sm:text-base rounded-l-full"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6A38C2] px-4 py-2"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
