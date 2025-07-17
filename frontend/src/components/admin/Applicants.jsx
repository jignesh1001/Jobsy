import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationsSlice";
import {  useParams } from "react-router-dom";
import { Input } from "../ui/input";


const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  
  const { applicants } = useSelector((store) => store.applications);
  const { input, setInput } = useState("");
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        console.log(res.data);
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);

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
