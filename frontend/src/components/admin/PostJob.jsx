import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";


const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    company: "",
  });


  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { allCompanies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = allCompanies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany?._id });
  };

  const submitHandler = async (e) => {
    console.log(input);
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <Navbar />
      <div className=" flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold mb-5"
              onClick={() => navigate("/admin/jobs")}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
          <div className="grid grid-cols-2 gap-2 ">
            <div>
              <Label>Title</Label>
              <Input
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                placeholder="Title"
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                placeholder="description"
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                placeholder="requirements"
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                placeholder="salary"
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                placeholder="location"
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>JobType</Label>
              <Input
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                placeholder="jobtype"
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                placeholder="experience"
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>No. Of Position</Label>
              <Input
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                placeholder="position"
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
            {allCompanies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {allCompanies.map((company) => {
                      return (
                        <SelectItem
                          value={company?.name?.toLowerCase()}
                          key={company._id}
                        >
                          {company.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Post New Job
            </Button>
          )}
          {allCompanies.length === 0 && (
            <p className="test-xs text-red-500  text-center my-3">
              *Please register a company first to post a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
