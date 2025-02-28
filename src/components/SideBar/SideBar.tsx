import { NavLink } from "react-router-dom";
import Avtr from "../Avtr";
import { avtrDets } from "@/constants";
import { ChevronDown } from "lucide-react";
import { useAuthContextProvider } from "@/hooks/useAuthContextProvider";

export const SideBar = () => {
  const { currentUser: user } = useAuthContextProvider();
  const navItems = [
    { icon: "/Feed.svg", label: "Feed", path: "feed" },
    {
      icon: "/Teams.svg",
      label: "All Projects",
      path: "all-projects",
    },
    { icon: "/Message28.svg", label: "Messages", path: "messages" },
    {
      icon: "/Time.svg",
      label: "Time Off",
      path: "time-off",
    },
    { icon: "/User.svg", label: "Profile", path: "profile" },
  ];

  return (
    <section className="space-y-3 p-2 flex flex-col items-center">
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
            <p className="font-bold text-[15px] text-nowrap w-32 truncate">{user?.username}</p>
            <p className="text-[#F6F6F9] text-sm font-light">Project Manager</p>
          </div>
          <div className="flex flex-1 justify-end">
            <ChevronDown className="text-white font-bold" size={20} />
          </div>
        </div>
      </div>
      <nav className="rounded-xl sm:min-w-[100px] md:min-w-[280px] h-[354px] bg-white p-4 flex flex-col space-y-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-2.5 rounded-lg
              transition-colors duration-200 font-medium space-x-3 
              ${isActive ? "bg-gray-100 text-pink-500" : " hover:bg-gray-50"}
              `}
          >
            <img src={item.icon} className="h-[31px] w-[31px]" />

            <span className="font-semibold text-[#706D8A] text-lg hidden md:block">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </section>
  );
};
