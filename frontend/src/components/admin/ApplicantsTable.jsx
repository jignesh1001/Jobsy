import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";

const shortListingStatus = ["accepted", "rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.applications);
  const { searchApplicantsByText } = useSelector((store) => store.job);
  const [filteredApplicants, setFilteredApplicants] = useState({
    applications: [],
  });

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (!applicants || !applicants.applications) return;

    const filtered = applicants.applications.filter((item) => {
      const name = item?.applicant?.fullname?.toLowerCase() || "";
      const title = item?.title?.toLowerCase() || "";
      const query = searchApplicantsByText.toLowerCase();

      return name.includes(query) || title.includes(query);
    });

    setFilteredApplicants({ ...applicants, applications: filtered });
  }, [searchApplicantsByText, applicants]);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A list of your Applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[120px]">FullName</TableHead>
            <TableHead className="min-w-[180px]">Email</TableHead>
            <TableHead className="min-w-[120px]">Contact</TableHead>
            <TableHead className="min-w-[140px]">Resume</TableHead>
            <TableHead className="min-w-[120px]">Applied Date</TableHead>
            <TableHead className="min-w-[100px]">Status</TableHead>
            <TableHead className="min-w-[80px] text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredApplicants?.applications?.length > 0 ? (
            filteredApplicants.applications.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 hover:underline"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      item.status === "rejected"
                        ? "bg-red-400"
                        : item.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-24">
                      {shortListingStatus.map((status, index) => (
                        <div
                          key={index}
                          className="my-1 cursor-pointer hover:underline"
                          onClick={() =>
                            statusHandler(status.toLowerCase(), item._id)
                          }
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
