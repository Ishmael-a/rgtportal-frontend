import {useState,PropsWithChildren } from "react"
import { AnimationWrapper } from "@/common/page-animation"
import rgtIcon from "../assets/logos/RGT TRANSPARENT 1.svg"
import { Search, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {HrSideBar} from "../components/SideBar/HrSideBar"
import { Outlet } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';



type HrLayoutProps = {
    userName?: string;
}
export const HrLayout = ({ userName = "Adjoa Odam"}: HrLayoutProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };


    return (
        <div className="flex">
            <div className=" text-center items-center justify-start bg-white min-h-screen overflow-hidden flex flex-col">
                <div className="px-16 py-5 ">
                    <img src={rgtIcon} className="w-10 h-10"/>
                </div>
                <HrSideBar/> 
            </div>


            <div className="flex flex-col w-full">
                <header className="sticky flex items-center justify-between px-16 py-5 bg-white border-b">
                {/* Left section with logo */}
                <div className="flex items-center gap-40 ">
                    
                    
                    {/* Greeting section */}
                    <div className="flex items-center gap-2" onClick={toggleDropdown}>
                        {isOpen ? (
                            <ChevronUp className="ml-2 h-4 w-4 transition-all ease-in-out duration-200" />
                        ) : (
                            <ChevronDown className="ml-2 h-4 w-4 transition-all ease-in-out duration-200" />
                        )}
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>LA</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Hello, {userName}!</span>
                                <span className="text-xs text-gray-500">Welcome back, let's explore now!</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    {/* Center section with search */}
                    <div className="flex-1 max-w-xl w-[400px] mx-8">
                        <div className="relative">
                        <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                            type="text" 
                            placeholder="Search" 
                            className="pl-10 py-5 bg-gray-50 border-none outline-none shadow-none"
                        />
                        </div>
                    </div>

                    {/* Right section with notification */}
                    <div className="flex items-center">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Bell className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                </header>

                <div className="ml-68 mt-5">
                    <AnimationWrapper key="childrenOfHrLayout">
                    {/* {children} */}
                    <Outlet/>
                    </AnimationWrapper>
                </div>
            </div>  
        </div>


    )
}