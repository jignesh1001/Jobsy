import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Pen, Mail, Contact } from "lucide-react";
import { Badge } from "./ui/badge";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import defaultImage from "../assets/default.jpg";
import { useGetApplications } from "@/hooks/useGetApplications";

const isResume = true;

function Profile() {
  useGetApplications();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { applications } = useSelector((store) => store.applications);

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto my-5 px-4 sm:px-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
          {/* Top section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar className="h-24 w-24 border border-gray-500">
                <AvatarImage
                  src={user?.profile?.profilePhoto || defaultImage}
                  alt="profile"
                />
              </Avatar>
              <div>
                <h1 className="font-medium text-xl">{user?.fullname}</h1>
                <p className="text-gray-600">{user?.profile?.bio}</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setOpen(true)}>
              <Pen />
            </Button>
          </div>

          {/* Contact Info */}
          <div className="my-5 space-y-3 text-sm sm:text-base">
            <div className="flex items-center gap-3">
              <Mail size={18} />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Contact size={18} />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="my-5">
            <h1 className="font-semibold mb-2">Skills</h1>
            <div className="flex flex-wrap items-center gap-2">
              {user?.profile?.skills.length > 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))
              ) : (
                <span className="text-gray-500">No Skills</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-5">
            <label className="text-md font-bold">Resume</label>
            <div className="mt-1">
              {isResume && user?.profile?.resume ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={user.profile.resume}
                  className="text-blue-500 hover:underline break-words"
                >
                  {user.profile.resumeOriginalName}
                </a>
              ) : (
                <span className="text-gray-500">No Resume Uploaded</span>
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="bg-white rounded-2xl mt-6 p-6 sm:p-8">
          <h1 className="font-bold text-lg mb-5">
            Applied Jobs ({applications.length})
          </h1>
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
