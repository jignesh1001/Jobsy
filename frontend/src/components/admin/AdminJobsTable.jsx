import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Popover } from "../ui/popover";
import { PopoverContent } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const AdminJobsTable = () => {
  useGetAllAdminJobs()
  const navigate = useNavigate();
  const { allAdminJobs ,searchJobByText} = useSelector(store => store.job);
  
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length > 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;

        return job?.title
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase()) ||
          job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <div className="max-w-5xl mx-auto my-10">
        <h1 className="font-bold text-lg my-5">
          Companies ({filterJobs.length})
        </h1>
        <Table>
          <TableCaption>Posted Jobs</TableCaption>
          <TableHeader>
            <TableRow className="text-right">
              <TableHead>Company Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterJobs.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.company?.name}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-22 ">
                      <div
                        className="flex items-center gap-2 w-fit cursor-pointer"
                        onClick={() => navigate(`/admin/jobs/${item._id}/update`)}
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div onClick={()=>navigate(`/admin/jobs/${item._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2"> 
                        <Eye className="w-4"/>
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobsTable;
