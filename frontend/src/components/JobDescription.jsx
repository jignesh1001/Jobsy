import { Badge } from "./ui/badge";

function Jobdescription() {
  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="font-bold text-xl">Title</h1>
      <div className="flex item-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          12 Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          Part Time
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          24 LPA
        </Badge>
      </div>
      <button>Apply now</button>
    </div>
  );
}

export default Jobdescription;
