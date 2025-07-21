import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useGetJobById from "@/hooks/useGetJobById";
import { setSingleJob } from "@/redux/jobSlice";

const EditJob = () => {
  const params = useParams();
  useGetJobById(params.id);

  const { singleJob } = useSelector((store) => store.job);
  const { allCompanies } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: 0,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        setSingleJob(input);
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      title: singleJob?.title || "",
      description: singleJob?.description || "",
      requirements: singleJob?.requirements || "",
      salary: singleJob?.salary || 0,
      location: singleJob?.location || "",
      jobType: singleJob?.jobType || "",
      experienceLevel: singleJob?.experienceLevel || "",
      position: singleJob?.position || 0,
    });
  }, [params.id, singleJob]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-8">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-4xl p-6 md:p-10 bg-white border border-gray-200 rounded-md shadow-md"
        >
          <h2 className="text-xl font-semibold mb-6 text-center">Edit Job</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["Title", "title"],
              ["Description", "description"],
              ["Requirements", "requirements"],
              ["Salary", "salary"],
              ["Location", "location"],
              ["Job Type", "jobType"],
              ["Experience", "experienceLevel"],
            ].map(([label, name]) => (
              <div key={name}>
                <Label>{label}</Label>
                <Input
                  name={name}
                  placeholder={label.toLowerCase()}
                  className="my-1"
                  value={input[name]}
                  onChange={changeEventHandler}
                />
              </div>
            ))}
            <div>
              <Label>No. Of Position</Label>
              <Input
                name="position"
                type="number"
                placeholder="position"
                className="my-1"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full mt-6" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-6">
              Update Job
            </Button>
          )}

          {allCompanies.length === 0 && (
            <p className="text-xs text-red-500 text-center mt-3">
              *Please register a company first to post a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditJob;
