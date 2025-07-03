import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useGetApplications } from "../hooks/useGetApplications";
import { useSelector } from "react-redux";

function AppliedJobTable() {
  useGetApplications();

  const { user } = useSelector((store) => store.auth);
  const { applications } = useSelector((store) => store.applications);
  // console.log(applications)

  const sampleData = [
    {
      date: "17-07-2025",
      position: "Frontend Dev",
      company: "XYZ Pvt Ltd",
      status: "Selected",
    },
    {
      date: "20-08-2025",
      position: "Backend Dev",
      company: "ABC Technologies",
      status: "Interview",
    },
    {
      date: "05-09-2025",
      position: "Fullstack Dev",
      company: "123 Solutions",
      status: "Rejected",
    },
    {
      date: "12-10-2025",
      position: "UI/UX Designer",
      company: "Creative Studio",
      status: "Selected",
    },
  ];

  if (!user) {
    return (
      <h1 className="text-center py-4">
        Please login to see your applied jobs
      </h1>
    );
  }

  return (
    <div>
      
      <Table>
        <TableCaption>Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell>{item.job?.title}</TableCell>
              <TableCell>{item.job?.company?.name}</TableCell>
              <TableCell className="text-right">
                <Badge>{item.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable;
