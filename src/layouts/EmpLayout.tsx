import { useState } from "react";
import rgtIcon from "../assets/logos/RGT TRANSPARENT 1.svg";
import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { SideBar } from "../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

type EmpLayoutProps = {
  userName?: string;
};
export const EmpLayout = ({ userName = "Layla Odam" }: EmpLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-16 py-5 bg-white border-b"
        style={{ zIndex: "999" }}
      >
        {/* Left section with logo */}
        <div className="flex items-center gap-40 ">
          <div className=" ">
            <img src={rgtIcon} className="w-10 h-10" />
          </div>

          {/* Greeting section */}
          <div className="flex items-center gap-2" onClick={toggleDropdown}>
            {isOpen ? (
              <ChevronUp className="ml-2 h-4 w-4 transition-all ease-in-out duration-200" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4 transition-all ease-in-out duration-200" />
            )}
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>LA</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Hello, {userName}!</span>
                <span className="text-xs text-gray-500">
                  Welcome back, let's explore now!
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Center section with search */}
          <div className="flex-1 max-w-xl w-[400px] mx-8">
            <div className="relative">
              <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search"
                className="pl-10 py-5 bg-gray-50 border-none outline-none shadow-none"
              />
            </div>
          </div>

          {/* Right section with notification */}
          <div className="flex items-center">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* className="min-h-screen flex" */}
      <div className="flex mt-5 min-h-screen">
        <div
          className="fixed translate-x-[30px] text-center"
          style={{ zIndex: 999 }}
        >
          <SideBar />
        </div>

        <div className="ml-68 flex-grow">
          {/* <AnimationWrapper key="childrenOfEmpLayout"> */}
          <Outlet />
          {/* </AnimationWrapper> */}
        </div>
      </div>
    </div>
  );
};
