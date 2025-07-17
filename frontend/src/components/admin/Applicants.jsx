import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { Input } from "../ui/input";
import { setSearchApplicantsByText } from "@/redux/jobSlice";
import { useGetAllApplicants } from "@/hooks/useGetAllApplicants";


const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  useGetAllApplicants(params.id);
  const { applicants } = useSelector((store) => store.applications);
  const [ input, setInput ] = useState("");
  useEffect(() => {
      dispatch(setSearchApplicantsByText(input))
  }, [input,dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name,role"
            type="text"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
          <h1 className="font-bold text-xl my-10">
            Applicants ({applicants?.applications?.length})
          </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
