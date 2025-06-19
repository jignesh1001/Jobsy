import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import testImage from "../assets/test.jpg";
import { Button } from "./ui/button";
import { Pen } from "lucide-react";
import { Mail, Contact } from "lucide-react";
import { Badge } from "./ui/badge";
import AppliedJobTable from "./AppliedJobTable";

const skills = [
  "HTML",
  "CSS",
  "Javascript",
  "React",
  "Nodejs",
  "Express",
  "MongoDB",
];
// const skills = [];
function Profile() {
  const isResume = true;
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-24 w-24">
              <AvatarImage src={testImage} alt="profile" />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Possimus.
              </p>
            </div>
          </div>
          <Button variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>test@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>934302403</span>
          </div>
        </div>

        {/* skills section */}
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {skills.length > 0 ? (
              skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>No Skills</span>
            )}
          </div>
        </div>
        {/* resume section */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label className="text-md font-bold">Resume</label>
          {isResume ? (
            <a
              target="blank"
              href="https://google.com"
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              Resume.pdf
            </a>
          ) : (
            <span>No Resume</span>
          )}
        </div>
      </div>
      {/* resume section */}


      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

    </div>
  );
}

export default Profile;
