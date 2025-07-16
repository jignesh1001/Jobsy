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

import { useSelector } from "react-redux";

function AppliedJobTable() {
  

  const { user } = useSelector((store) => store.auth);
  const { applications } = useSelector((store) => store.applications);
  // console.log(applications)
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
              <TableCell>{item.createdAt?.split("T")[0]}</TableCell>
              <TableCell>{item.job?.title}</TableCell>
              <TableCell>{item.job?.company?.name}</TableCell>
              <TableCell className="text-right">
                <Badge className={`${item.status === "rejected" ? "bg-red-400" : item.status === "pending" ? "bg-gray-400" : "bg-green-400"}`}>{item.status.toUpperCase()}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable;
