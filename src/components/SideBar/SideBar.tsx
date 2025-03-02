import { NavLink } from "react-router-dom";
import Avtr from "../Avtr";
import { avtrDets } from "@/constants";
import { ChevronDown } from "lucide-react";
import { useAuthContextProvider } from "@/hooks/useAuthContextProvider";
import { useState } from "react";
import UsersIcon from "@/assets/empNavCons/UsersIcon";
import FeedIcon from "@/assets/empNavCons/FeedIcon";
import MessageIcon from "@/assets/empNavCons/MessageIcon";
import ProfileIcon from "@/assets/empNavCons/ProfileIcon";
import TimeIcon from "@/assets/empNavCons/TimeIcon";

export const SideBar = () => {
  const { currentUser: user } = useAuthContextProvider();
  const [indicator, setIndicator] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const handleIndicator = (val: string) => {
    setIndicator(val);
    console.log("val:", val);
  };

  const navItems = [
    { icon: FeedIcon, label: "Feed", path: "feed" },
    {
      icon: UsersIcon,
      label: "All Projects",
      path: "all-projects",
    },
    { icon: MessageIcon, label: "Messages", path: "messages" },
    {
      icon: TimeIcon,
      label: "Time Off",
      path: "time-off",
    },
    { icon: ProfileIcon, label: "Profile", path: "profile" },
  ];

  return (
    <section className="space-y-3 p-2 flex flex-col items-center h-full">
      <div className="space-y-3">
        <header className="md:flex flex-col items-start hidden">
          <p className="font-semibold text-[24px] text-[#706D8A]">
            Hello, there!
          </p>
          <p className="text-sm font-medium text-[#8C8C8C]">
            Welcome back, let's explore now!
          </p>
        </header>
        <div className="flex bg-[#452667] text-white justify-start items-center px-4 md:p-[16px] space-x-2 md:space-x-4 rounded-lg md:w-[240px] h-[72px]">
          {avtrDets[0].avtr && (
            <Avtr
              url={avtrDets[0].avtr.url}
              name="Layla"
              className="border-0"
            />
          )}
          <div className="md:flex flex-col items-start justify-center hidden">
            <p className="font-bold text-[15px] text-nowrap w-32 truncate">
              {user?.username}
            </p>
            <p className="text-[#F6F6F9] text-sm font-light">Project Manager</p>
          </div>
          <div
            className={`flex flex-1 justify-end cursor-pointer transition-all duration-300 ease-in ${
              showProfile ? "rotate-180" : ""
            }`}
            onClick={() => setShowProfile(!showProfile)}
          >
            <ChevronDown className="text-white font-bold" size={20} />
          </div>
        </div>
      </div>
      <nav className="rounded-xl justify-center items-center md:items-start sm:min-w-[100px] md:min-w-[280px] h-[354px] bg-white py-4 flex flex-col space-y-4 shadow-md">
        {navItems.map((item) => (
          <div
            className="flex items-center justify-center w-full"
            onClick={() => handleIndicator(item.path)}
          >
            {indicator === item.path && (
              <div
                className={`h-[35px] w-[5px] bg-[#E328AF] rounded-r-full transition-all duration-300 ease-in`}
              />
            )}

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
              flex items-center justify-center md:justify-start gap-3 px-4 py-2.5 rounded-lg
              transition-colors duration-200 font-medium space-x-3 flex-1 text-[#706D8A]
              ${isActive ? "text-[#E328AF]" : "hover:bg-gray-50"}
              `}
            >
              {indicator === item.path ? (
                <item.icon color="#E328AF" />
              ) : (
                <item.icon />
              )}

              <span className="font-semibold text-lg hidden md:block">
                {item.label}
              </span>
            </NavLink>
          </div>
        ))}
      </nav>
    </section>
  );
};
