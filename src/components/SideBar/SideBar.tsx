
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

export const SideBar = () => {

  const navItems = [
    { icon: "/Feed.svg", label: 'Feed', path: 'feed' },
    { 
      icon: "/Teams.svg", label: 'Teams', path: '/teams', 
      items: [
        { label: 'Settings', path: '/settings' },
        { label: 'Help', path: '/help' }
      ] 
    },
    { icon: "/Message28.svg", label: 'Messages', path: '/messages' },
    { icon: "/Time.svg", label: 'Time Off', path: '/time-off',
      items: [
        { label: 'Settings', path: '/settings' },
        { label: 'Help', path: '/help' }
      ] 
    },
    { icon: "/User.svg", label: 'Profile', path: '/profile' }
  ];

    return (
      <nav className="w-64 rounded-xl  h-auto bg-white p-4 flex flex-col gap-7">
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
    </nav>
  )
}