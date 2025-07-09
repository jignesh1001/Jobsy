import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "../ui/avatar";
import { Popover } from "../ui/popover";
import { PopoverContent } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CompaniesTable = () => {
  useGetAllCompanies();
  
  const companies = useSelector((state) => state.company.allCompanies);
    const {user}= useSelector((state) => state.auth);
    console.log(user);
    console.log(companies)
    const navigate = useNavigate();
  return (
    <div>
      <div className="max-w-4xl mx-auto my-10">
        <h1 className="font-bold text-lg my-5">
          Companies ({companies.length})
        </h1>
        <Table>
          <TableCaption>Registered Companies</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>CreatedBy</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(item.createdAt).toDateString()}{" "}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{user?.fullname}</TableCell>
                <TableCell>
                  {new Date(item.updatedAt).toDateString()}{" "}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32" >
                      <div className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
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

export default CompaniesTable;
