import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronUp, Dot } from 'lucide-react';


interface Item {
    path: string;
    label: string;
}

type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface INavDropdown{
    items: Item[];
    icon: LucideIcon;
    label: string;
    className: string;
}

export const NavDropdown = ({ 
  items, 
  icon: Icon,
  label = "Select an option",
  className = ""
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
        className={`inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium 
          bg-white border rounded-md hover:bg-gray-50 border-none outline-none ${className} `}
      >
        <div className="flex gap-3 items-center ">
            <Icon 
                className={`h-6 w-6 `} 
            />
            <span className="flex">{label}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="ml-2 h-4 w-4 transition-all ease-in-out duration-200" />
        ) : (
          <ChevronDown className="ml-2 h-4 w-4 transition-all ease-in-out duration-200" />
        )}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="  transition-colors duration-200 mt-2 w-full rounded-md bg-white ">
          <div className="py-1">
            {items.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-2.5 rounded-lg
                    transition-colors duration-200 font-medium 
                    ${isActive 
                    ? 'bg-gray-100 text-purple-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                    }
                `
                }
                onClick={() => setIsOpen(false)}
              >
                <Dot className="h-6 w-6  transition-all ease-in-out duration-200"/>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
