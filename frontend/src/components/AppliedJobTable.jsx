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

  if (!user) {
    return (
      <h1 className="text-center py-4 text-gray-600">
        Please login to see your applied jobs
      </h1>
    );
  }

  if (applications.length === 0) {
    return (
      <h1 className="text-center py-4 text-gray-500">
        No applications found.
      </h1>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <Table>
          <TableCaption className="text-sm text-gray-500">
            Your Applied Jobs
          </TableCaption>
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
                <TableCell className="whitespace-nowrap text-sm">
                  {item.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm font-medium">
                  {item.job?.title}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm">
                  {item.job?.company?.name}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`text-white text-xs px-2 py-1 ${
                      item.status === "rejected"
                        ? "bg-red-400"
                        : item.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-500"
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AppliedJobTable;
