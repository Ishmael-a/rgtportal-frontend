import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, Dot } from "lucide-react";

interface Item {
  path: string;
  label: string;
}

// type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface INavDropdown {
  items: Item[];
  iconPath: string;
  label: string;
  className?: string;
  iconClassName?: string;
  itemlabelClassName?: string;
}

export const NavDropdown = ({
  items,
  iconPath,
  label = "Select an option",
  className = "",
  iconClassName = "h-6 w-6",
  itemlabelClassName = "",
}: INavDropdown) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="inline-block text-left">
      {/* Dropdown button */}
      <button
        onClick={toggleDropdown}
        className={`inline-flex justify-between items-center w-full px-4 py-2.5 text-sm font-medium
          bg-white border  hover:bg-gray-50 border-none outline-none ${className}`}
      >
        <div className="flex gap-3 items-center">
          <img src={iconPath} className={iconClassName}/>
          {/* <Icon className={` ${iconClassName}`} /> */}
          <span className="flex">{label}</span>
        </div>
        <div className="relative h-4 w-4 ml-2">
          <ChevronDown
            className={`absolute h-4 w-4 transition-all duration-500 ease-in-out
              ${isOpen
                ? "opacity-0 transform -translate-y-2 scale-0"
                : "opacity-100 transform translate-y-0 scale-100"
              }`}
          />
          <ChevronDown
            className={`absolute h-4 w-4 transition-all duration-500 ease-in-out transform rotate-180
              ${isOpen
                ? "opacity-100 transform translate-y-0 scale-100"
                : "opacity-0 transform translate-y-2 scale-0"
              }`}
          />
        </div>
      </button>

      {/* Dropdown menu with smooth transition */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? "max-h-96" : "max-h-0"}`}
      >
        <div 
          className={`mt-2 w-full rounded-md bg-white transition-all duration-500 ease-in-out
            ${isOpen 
              ? "opacity-100 transform translate-y-0" 
              : "opacity-0 transform -translate-y-4"
            }`}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-2.5 rounded-lg
                  transition-all duration-300 font-medium
                  ${isActive ? "bg-gray-100 text-purple-600" : "text-gray-600 hover:bg-gray-50"}
                `}
                onClick={() => setIsOpen(false)}
              >
                <Dot className="h-6 w-6 transition-all ease-in-out duration-300" />
                <p className={itemlabelClassName}>{item.label}</p>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavDropdown;