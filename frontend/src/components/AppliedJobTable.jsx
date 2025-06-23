
import {   Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,} from "./ui/table"
import { Badge } from "./ui/badge"


function AppliedJobTable() {
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
                {
                    sampleData.map((item,index)=>(
                        <TableRow key={index}>
                         <TableCell>{item.date}</TableCell>
                         <TableCell>{item.position}</TableCell>
                         <TableCell>{item.company}</TableCell>
                         <TableCell className="text-right"><Badge>{item.status}</Badge></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable