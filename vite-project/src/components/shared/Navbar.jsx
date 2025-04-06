import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
const Navbar =()=> {
  const user = false;

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <Link to="/">
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
          </Link>
          
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {/* <li> <Link>Home</Link> </li>
            <li> <Link>Jobs</Link> </li>
            <li> <Link>Browse</Link> </li> */}
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/jobs'>Jobs</Link></li>
            <li><Link to='/browse'>Browse</Link></li>
           
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button className= "bg-[#6A38C2] hover:bg-[#5b30a6]">SignUp</Button></Link>
              
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer w-16 h-16 ">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-full"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 rounded">
                <div className="">
                  <div className="flex gap-4 space-y-2 pt-4 pb-4 pl-4 shadow-md">
                    <Avatar className="cursor-pointer w-16 h-16  ">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                        className="rounded-full"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Test user</h4>
                      <p className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col my-2 gap-3 text-gray-600">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2></User2>
                      <Button variant="link">View Profile</Button>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut></LogOut>
                      <Button variant="link">Logout</Button>
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
}

export default Navbar;
