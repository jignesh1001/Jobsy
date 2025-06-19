
import {   Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,} from "./ui/table"
import { Badge } from "./ui/badge"


function AppliedJobTable() {
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
                    [1,2,3,4].map((item,index)=>(
                        <TableRow key={index}>
                         <TableCell>17-07-2025</TableCell>
                         <TableCell>Frontend Dev</TableCell>
                         <TableCell>XYZ pvt ltd</TableCell>
                         <TableCell className="text-right"><Badge>Selected</Badge></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable