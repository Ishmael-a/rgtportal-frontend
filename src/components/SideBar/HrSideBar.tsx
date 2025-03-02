import { NavDropdown } from "./NavDropdown";
import { NavLink } from "react-router-dom";

export const HrSideBar = () => {
  const navItems = [
    { icon: "/Feed.svg", label: "Feed", path: "feed" },
    {
      icon: "/Employees.svg",
      label: "Employees",
      path: "/employees",
      items: [
        { label: "Manage Employees", path: "manageemployees" },
        { label: "Employee Card", path: "employeecard" },
        { label: "All Departments", path: "alldepartments" },
      ],
    },
    {
      icon: "/Time.svg",
      label: "Time Off",
      path: "/time-off",
      items: [
        { label: "Settings", path: "/settings" },
        { label: "Help", path: "/help" },
      ],
    },
    {
      icon: "/AddProfile.svg",
      label: "Recruitment",
      path: "/recruitment",
      items: [
        { label: "Settings", path: "/settings" },
        { label: "Help", path: "/help" },
      ],
    },
    { icon: "/Message28.svg", label: "Messages", path: "/messages" },
    { icon: "/Calender2.svg", label: "Events", path: "/events" },
    { icon: "/Chart.svg", label: "Reports", path: "/reports" },
  ];

  return (
    <nav className="w-[280px] rounded-4xl h-fit text-center bg-white flex-col hidden md:flex">
      <NavLink
        to="/hr/dashboard"
        end={true}
        className={({ isActive }) => `
            group flex items-center justify-center text-center font-medium text-sm 
            rounded-t-4xl py-4 mb-4 w-full transition-colors ease-in-out duration-400
            ${
              isActive
                ? "bg-rgtviolet text-white" // Active state styles
                : "hover:bg-rgtviolet hover:text-white" // Base + hover state
            }`}
      >
        {({ isActive }) => (
          <>
            <span>HR Dashboard</span>
            <div className="relative ml-2 w-6 h-6">
              <img
                src="/Dashboard3.svg"
                className={`absolute inset-0 w-full h-full transition-opacity duration-300 
                    ${isActive ? "opacity-0" : "opacity-100"}`}
              />
              <img
                src="/DashboardWhite.svg"
                className={`absolute inset-0 w-full h-full transition-opacity duration-300
                    ${isActive ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          </>
        )}
      </NavLink>
      <div className=" pb-8 w-full text-center flex flex-col gap-6">
        {navItems.map((item) =>
          item.items ? (
            <NavDropdown
              items={item.items}
              label={item.label}
              iconPath={item.icon}
              className="w-48 "
              iconClassName="mr-4"
              itemlabelClassName="ml-4 text-sm"
            />
          ) : (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
            relative flex items-center gap-3 px-4 py-2.5 
            transition-colors duration-200 
            ${
              isActive
                ? "bg-gray-100 text-purple-600 font-bold"
                : " hover:bg-gray-50"
            }
            `}
            >
              {({ isActive }) => (
                <>
                  {/* Left accent bar */}
                  <span
                    className={`absolute left-0 top-0 h-full w-[5px] rounded-r-xl transition-all
                    ${isActive ? "bg-purple-600" : "bg-transparent"}`}
                  />
                  <img src={item.icon} className="h-6 w-6 mr-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          )
        )}
      </div>
    </nav>
  );
};
