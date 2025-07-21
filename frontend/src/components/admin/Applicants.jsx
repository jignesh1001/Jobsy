import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Input } from "../ui/input";
import { setSearchApplicantsByText } from "@/redux/jobSlice";
import { useGetAllApplicants } from "@/hooks/useGetAllApplicants";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  useGetAllApplicants(params.id);

  const { applicants } = useSelector((store) => store.applications);
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchApplicantsByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between my-6 gap-3">
          <Input
            className="w-full sm:max-w-xs"
            placeholder="Filter by name, role"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <h1 className="font-bold text-lg sm:text-xl">
            Applicants ({applicants?.applications?.length || 0})
          </h1>
        </div>

        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
