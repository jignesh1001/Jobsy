import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Popover, PopoverContent } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const AdminJobsTable = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length > 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;

        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            ?.toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="px-4">
      <div className="max-w-6xl mx-auto my-10">
        <h1 className="font-bold text-lg my-5">Jobs ({filterJobs.length})</h1>

        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Posted Jobs</TableCaption>
            <TableHeader>
              <TableRow>
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
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent className="w-28 space-y-2">
                        <div
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() =>
                            navigate(`/admin/jobs/${item._id}/update`)
                          }
                        >
                          
                          <span>Edit</span>
                        </div>
                        <hr />
                        <div
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() =>
                            navigate(`/admin/jobs/${item._id}/applicants`)
                          }
                        >
                
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
    </div>
  );
};

export default AdminJobsTable;
