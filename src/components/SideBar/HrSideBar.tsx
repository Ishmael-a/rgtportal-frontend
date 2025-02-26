
import React from 'react';
import {NavDropdown} from "./NavDropdown";
import { NavLink } from 'react-router-dom';
import { 
  Home,
  Users,
  MessageCircle,
  Clock,
  User
} from 'lucide-react';

export const HrSideBar = () => {

  const navItems = [
    { icon: "/Feed.svg", label: 'Feed', path: '/feed' },
    { 
      icon: "/Employees.svg", label: 'Employees', path: '/employees', 
      items: [
        { label: 'Manage Employees', path: '/manageemployees' },
        { label: 'Employee Card', path: '/employeecard' }
      ] 
    },
    { icon: "/Time.svg", label: 'Time Off', path: '/time-off',
      items: [
        { label: 'Settings', path: '/settings' },
        { label: 'Help', path: '/help' }
      ] 
    },
    { icon: "/AddProfile.svg", label: 'Recruitment', path: '/recruitment',
      items: [
        { label: 'Settings', path: '/settings' },
        { label: 'Help', path: '/help' }
      ] 
    },
    { icon: "/Message28.svg", label: 'Messages', path: '/messages' },
    { icon: "/Calender2.svg", label: 'Events', path: '/events' },
    { icon: "/Chart.svg", label: 'Reports', path: '/reports' }
  ];

    return (
      <nav className="w-64 rounded-4xl h-full text-center bg-white pb-4  flex flex-col ">
        <NavLink to={"/hrdashboard"} className="group flex items-center justify-center text-center  font-medium text-sm rounded-t-4xl py-4 mb-4 w-full hover:bg-rgtviolet hover:text-white transition-colors ease-in-out duration-400" >
            HR Dashboard 
            <div className="relative ml-2 w-6 h-6">
                {/* Default Image */}
                <img
                src="/Dashboard3.svg"
                className="absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                />

                {/* Hover Image */}
                <img
                src="/DashboardWhite.svg"
                className="absolute inset-0 text-white w-full h-full opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                />
            </div>
        </NavLink>
        <div className="px-4 w-full text-center flex flex-col gap-6">
      {navItems.map((item) => (
          item.items ?  
          <NavDropdown 
            items={item.items}
            label={item.label}
            iconPath = {item.icon}
            className="w-48 "
            iconClassName = "mr-4"
            itemlabelClassName='ml-4 text-sm'
          />
          :
          <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-2.5 rounded-lg
            transition-colors duration-200 font-medium 
            ${isActive 
                ? 'bg-gray-100 text-pink-500' 
                : ' hover:bg-gray-50'
            }
            `}
            >
            <img src={item.icon} className="h-6 w-6 mr-4"/>
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        
    ))}
    </div>
    </nav>
  )
}