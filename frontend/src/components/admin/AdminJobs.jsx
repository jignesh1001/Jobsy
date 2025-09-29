import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setSearchJobByText } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";

const AdminJobs = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 my-10">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <Input
            className="flex-1 min-w-[200px]"
            placeholder="Filter by name, role"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="w-full sm:w-auto"
            onClick={() => navigate("/admin/jobs/create")}
          >
            New Job
          </Button>
        </div>

        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
