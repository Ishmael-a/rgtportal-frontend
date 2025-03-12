import { NavLink } from "react-router-dom";
import Avtr from "../Avtr";
import { ChevronDown } from "lucide-react";
import { useAuthContextProvider } from "@/hooks/useAuthContextProvider";
import { useState } from "react";
import UsersIcon from "@/assets/icons/UsersIcon";
import FeedIcon from "@/assets/icons/FeedIcon";
import MessageIcon from "@/assets/icons/MessageIcon";
import TimeIcon from "@/assets/icons/TimeIcon";

export const SideBar = () => {
  const { currentUser: user } = useAuthContextProvider();
  const [showProfile, setShowProfile] = useState(false);

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
  ];

  return (
    <section className="space-y-3 p-2 flex flex-col items-center h-full">
      <div className="bg-white rounded-[30px] flex flex-col items-center md:py-[31px] ">
        <div className="space-y-3">
          {/* <header className="md:flex flex-col items-start hidden">
            <p className="font-semibold text-[24px] text-[#706D8A]">
              Hello, there!
            </p>
            <p className="text-sm font-medium text-[#8C8C8C]">
              Welcome back, let's explore now!
            </p>
          </header> */}
          <div className="flex bg-[#452667] text-white justify-start items-center px-4 md:p-[16px] space-x-2 md:space-x-4 rounded-lg md:w-[240px] h-[72px]">
            {/* {avtrDets[0].avtr && ( */}
            <Avtr
              url={user?.profileImage}
              name={user?.username}
              className="border-0"
            />
            {/* )} */}
            <div className="md:flex flex-col items-start justify-center hidden">
              <p className="font-bold text-[15px] text-nowrap w-32 truncate">
                {user?.username}
              </p>
              <p className="text-[#F6F6F9] text-sm font-light">
                {user?.role.name}
              </p>
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
        <nav className="rounded-xl justify-center items-center md:items-start sm:min-w-[100px] md:min-w-[280px] h-[294px]  py-4 flex flex-col space-y-4 ">
          {navItems.map((item) => (
            <div className="w-full">
              <NavLink key={item.path} to={item.path}>
                {({ isActive }) => (
                  <div
                    className={`
              flex items-center  justify-center md:justify-start  py-2.5 rounded-lg
              transition-colors duration-200 font-medium  flex-1 text-[#706D8A]
              ${isActive ? "text-[#E328AF]" : "hover:bg-gray-50"}
              `}
                  >
                    {isActive && (
                      <div
                        className={`h-[35px] w-[5px] bg-[#E328AF] rounded-r-full transition-all duration-300 ease-in`}
                      />
                    )}
                    <div className="flex items-center gap-3 pl-4 transition-all duration-300 ease-in">
                      {isActive ? <item.icon color="#E328AF" /> : <item.icon />}
                      <span className="font-semibold text-lg hidden md:block">
                        {item.label}
                      </span>
                    </div>
                  </div>
                )}
              </NavLink>
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
};
