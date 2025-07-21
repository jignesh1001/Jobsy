import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const navigate = useNavigate();
  const { allCompanies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const { user } = useSelector((state) => state.auth);
  const [filterCompany, setFilterCompany] = useState(allCompanies);

  useEffect(() => {
    const filteredCompany =
      allCompanies.length > 0 &&
      allCompanies.filter((company) => {
        if (!searchCompanyByText) return true;
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [allCompanies, searchCompanyByText]);

  return (
    <div className="w-full px-4">
      <div className="max-w-6xl mx-auto my-10">
        <h1 className="font-bold text-lg my-5">
          Companies ({filterCompany.length})
        </h1>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <Table className="min-w-[800px]">
            <TableCaption>Registered Companies</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterCompany.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={
                          item?.logo || "https://github.com/shadcn.png"
                        }
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{user?.fullname}</TableCell>
                  <TableCell>{item.updatedAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-fit">
                        <div
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() =>
                            navigate(`/admin/companies/${item._id}`)
                          }
                        >
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
    </div>
  );
};

export default CompaniesTable;
