
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
    { icon: Home, label: 'Feed', path: '/feed' },
    { 
      icon: Users, label: 'Employees', path: '/employees', 
      items: [
        { label: 'Manage Employees', path: '/manageemployees' },
        { label: 'Employee Card', path: '/employeecard' }
      ] 
    },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: Clock, label: 'Time Off', path: '/time-off',
      items: [
        { label: 'Settings', path: '/settings' },
        { label: 'Help', path: '/help' }
      ] 
    },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

    return (
      <nav className="w-70 h-full text-center bg-white p-4  px-8 flex flex-col gap-7">
      {navItems.map((item) => (
        item.items ?  
          <NavDropdown 
            items={item.items}
            label={item.label}
            icon = {item.icon}
            className="w-48"
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
          <item.icon 
            className={`h-6 w-6 `} 
          />
          <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        
      ))}
    </nav>
  )
}