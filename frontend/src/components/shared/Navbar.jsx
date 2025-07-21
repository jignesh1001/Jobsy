import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut, Menu, User2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/default.jpg";
import { useState } from "react";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logouthandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 h-16">
        {/* Logo */}
        <Link to="/" className="flex flex-col">
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">sy</span>
          </h1>
          <h5 className="italic text-xs">making job hunt easier</h5>
        </Link>

        {/* Hamburger Button for Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu Links + Buttons */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">SignUp</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer w-12 h-12">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || defaultImage}
                    alt="profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 rounded bg-white">
                <div className="">
                  <div className="flex gap-4 space-y-2 pt-4 pb-4 pl-4 shadow-md">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={user?.profile?.profilePhoto || defaultImage}
                        alt="profile"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col my-2 gap-3 text-gray-600">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                    >
                      <User2 className="w-4" />
                      View Profile
                    </Link>
                    <button
                      onClick={logouthandler}
                      className="flex items-center gap-2 text-sm text-red-600 hover:underline"
                    >
                      <LogOut className="w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-3 font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex flex-col gap-2 mt-4">
              <Link to="/login"><Button variant="outline" className="w-full">Login</Button></Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">SignUp</Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-4 text-gray-600">
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <User2 className="w-4" />
                View Profile
              </Link>
              <button
                onClick={logouthandler}
                className="flex items-center gap-2 text-sm text-red-600 hover:underline"
              >
                <LogOut className="w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
