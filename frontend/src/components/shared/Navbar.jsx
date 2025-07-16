import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/default.jpg";
const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logouthandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        console.log(res.data);
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white ">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold">
              Job<span className="text-[#F83002]">sy</span>
            </h1>
            <h5 className="font-style: italic text-xs">
              making job hunt easier
            </h5>
          </Link>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer w-12 h-12 ">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || defaultImage}
                    alt="@shadcn"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 rounded">
                <div className="">
                  <div className="flex gap-4 space-y-2 pt-4 pb-4 pl-4 shadow-md">
                    <Avatar className="cursor-pointer w-12 h-12">
                      <AvatarImage
                        src={user?.profile?.profilePhoto || defaultImage}
                        alt="@shadcn"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </Avatar>
                    <div >
                      <h4 className="font-medium">{user.fullname + user.phoneNumber}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col my-2 gap-3 text-gray-600 ">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2></User2>
                      <Button variant="link">
                        <Link to={"/profile"}>View Profile</Link>
                      </Button>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut></LogOut>
                      <Button onClick={logouthandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
