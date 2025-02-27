import { NavLink } from "react-router-dom";

export const SideBar = () => {
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
    <nav className="w-55 rounded-xl  h-auto bg-white p-4 flex flex-col gap-7">
      {
        navItems.map((item) => (
          
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-2.5 rounded-lg
              transition-colors duration-200 font-medium 
              ${isActive ? "bg-gray-100 text-pink-500" : " hover:bg-gray-50"}
              `}
          >
            <img src={item.icon} className="h-6 w-6 mr-4" />

            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))
      }
    </nav>
  );
};
