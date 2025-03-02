import { useState, useEffect } from 'react';
import { Column, ActionObject } from "@/types/tables";
import { DataTable } from '../common/DataTable';
import {StepProgress} from "../StepProgress";
import { ChevronLeft, ChevronRight, Check, Eye, Pencil } from "lucide-react";



export interface EmployeeData {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    birthday: string;
    age: number;
    city: string;
    homeAddress: string;
    region: string;
    country: string;
    startDate: string;
    seniority: string;
    status: string;
    skills: string[];
    ftpt: "FT" | "PT";
    department: string;
    teamLeader: string;
    jrTeamLeader: string;
    notes: string;
    agency: string;
    gotInvoice: boolean;
    paid: boolean;
    onLeave: boolean;
    endDate: string;
    duration: string;
    reasonForLeave: string;
    leaveExplanation: string;
    profileImage?: string;
  }

const EmployeeManagementTable: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [employees, setEmployees] = useState<EmployeeData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeSection, setActiveSection] = useState<string>("personal");
    
    // Mock data based on the images
    const mockData: EmployeeData[] = [
      {
        id: 1,
        name: "Enchill Beckham",
        email: "eb@reallygreattech.com",
        phoneNumber: "+12 345 6789 0",
        birthday: "03 Mar 1999",
        age: 24,
        city: "Accra",
        homeAddress: "East Legon Rd St 102",
        region: "Greater Accra",
        country: "Ghana",
        startDate: "Engagement",
        seniority: "4 years",
        status: "Emergency",
        skills: ["React/Node"],
        ftpt: "FT",
        department: "Design",
        teamLeader: "Razak",
        jrTeamLeader: "Worbzy",
        notes: "East Legon Rd St 102",
        agency: "Huetal",
        gotInvoice: true,
        paid: false,
        onLeave: false,
        endDate: "03 Mar 1999",
        duration: "14 Days",
        reasonForLeave: "Layed Off",
        leaveExplanation: "Unwell",
        profileImage: "/profiles/enchill.jpg"
      },
      {
        id: 2,
        name: "Ben Barker",
        email: "bb@reallygreattech.com",
        phoneNumber: "+12 345 6789 0",
        birthday: "03 Mar 1999",
        age: 24,
        city: "Accra",
        homeAddress: "East Legon Rd St 102",
        region: "Greater Accra",
        country: "Ghana",
        startDate: "Unwell",
        seniority: "4 years",
        status: "Emergency",
        skills: ["React/Node"],
        ftpt: "FT",
        department: "Design",
        teamLeader: "Razak",
        jrTeamLeader: "Worbzy",
        notes: "East Legon Rd St 102",
        agency: "Huetal",
        gotInvoice: true,
        paid: true,
        onLeave: true,
        endDate: "03 Mar 1999",
        duration: "14 Days",
        reasonForLeave: "Layed Off",
        leaveExplanation: "Unwell",
        profileImage: "/profiles/ben.jpg"
      },
      {
        id: 3,
        name: "Eddy Donti",
        email: "ed@reallygreattech.com",
        phoneNumber: "+12 345 6789 0",
        birthday: "03 Mar 1999",
        age: 24,
        city: "Accra",
        homeAddress: "East Legon Rd St 102",
        region: "Greater Accra",
        country: "Ghana",
        startDate: "Emergency",
        seniority: "4 years",
        status: "Emergency",
        skills: ["React/Node"],
        ftpt: "FT",
        department: "Design",
        teamLeader: "Razak",
        jrTeamLeader: "Worbzy",
        notes: "East Legon Rd St 102",
        agency: "Huetal",
        gotInvoice: true,
        paid: true,
        onLeave: true,
        endDate: "03 Mar 1999",
        duration: "14 Days",
        reasonForLeave: "Layed Off",
        leaveExplanation: "Unwell",
        profileImage: "/profiles/eddy.jpg"
      },
      {
        id: 4,
        name: "Carmelo Kori",
        email: "ck@reallygreattech.com",
        phoneNumber: "+12 345 6789 0",
        birthday: "03 Mar 1999",
        age: 24,
        city: "Accra",
        homeAddress: "East Legon Rd St 102",
        region: "Greater Accra",
        country: "Ghana",
        startDate: "Emergency",
        seniority: "4 years",
        status: "Emergency",
        skills: ["React/Node"],
        ftpt: "FT",
        department: "Design",
        teamLeader: "Razak",
        jrTeamLeader: "Worbzy",
        notes: "East Legon Rd St 102",
        agency: "Huetal",
        gotInvoice: true,
        paid: false,
        onLeave: false,
        endDate: "03 Mar 1999",
        duration: "14 Days",
        reasonForLeave: "Layed Off",
        leaveExplanation: "Unwell",
        profileImage: "/profiles/carmelo.jpg"
      },
      {
        id: 5,
        name: "Anthony Daly",
        email: "ad@reallygreattech.com",
        phoneNumber: "+12 345 6789 0",
        birthday: "03 Mar 1999",
        age: 24,
        city: "Accra",
        homeAddress: "East Legon Rd St 102",
        region: "Greater Accra",
        country: "Ghana",
        startDate: "Emergency",
        seniority: "4 years",
        status: "Emergency",
        skills: ["React/Node"],
        ftpt: "FT",
        department: "Design",
        teamLeader: "Razak",
        jrTeamLeader: "Worbzy",
        notes: "East Legon Rd St 102",
        agency: "Huetal",
        gotInvoice: true,
        paid: true,
        onLeave: true,
        endDate: "03 Mar 1999",
        duration: "14 Days",
        reasonForLeave: "Layed Off",
        leaveExplanation: "Unwell",
        profileImage: "/profiles/anthony.jpg"
      }
    ];
    
    // Simulating API data fetch
    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setEmployees(mockData);
        setLoading(false);
      }, 500);
    }, [currentPage]);
  
    // Action handlers
    const handleView = (id?: number): void => {
      console.log(`Viewing employee with ID: ${id}`);
    };
  
    const handleEdit = (id?: number): void => {
      console.log(`Editing employee with ID: ${id}`);
    };
  
    // First section columns (Personal Info)
    const columns: Column[] = [
      {
        key: "name",
        header: "Employee Name",
        render: (row) => (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-gray-200">
              {row.profileImage ? (
                <img src="/api/placeholder/32/32" alt={row.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-purple-200 text-purple-700">
                  {row.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="font-medium">{row.name}</div>
              <div className="text-xs text-gray-500">{row.email}</div>
            </div>
          </div>
        ),
      },
      {
        key: "phoneNumber",
        header: "Phone Number",
      },
      {
        key: "email",
        header: "Email",
      },
      {
        key: "birthday",
        header: "Birthday",
      },
      {
        key: "age",
        header: "Age",
      },
      {
        key: "city",
        header: "City",
      },
      {
        key: "homeAddress",
        header: "Home Address",
      },
      {
        key: "region",
        header: "Region",
      },
      {
        key: "country",
        header: "Country",
      },
      {
        key: "startDate",
        header: "Start Date",
        render: (row) => (
          <div className={`px-2 py-1 rounded ${
            row.startDate === "Emergency" ? "text-red-600" : 
            row.startDate === "Unwell" ? "text-yellow-600" : 
            "text-blue-600"
          }`}>
            {row.startDate}
          </div>
        ),
      },
      {
        key: "seniority",
        header: "Seniority",
      },
      {
        key: "skills",
        header: "Skills",
        render: (row) => (
          <div>{row.skills.join(", ")}</div>
        ),
      },
      {
        key: "ftpt",
        header: "FT/PT",
        render: (row) => (
          <div className="flex items-center">
            {row.ftpt}
            <div className="ml-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </div>
        ),
      },
      {
        key: "department",
        header: "Department",
      },
      {
        key: "teamLeader",
        header: "Team Leader",
      },
      {
        key: "jrTeamLeader",
        header: "Jr. Team Leader",
      },
      {
        key: "notes",
        header: "Notes",
      },
      {
        key: "agency",
        header: "Agency",
      },
      {
        key: "gotInvoice",
        header: "Got Invoice",
        render: (row) => (
          <div className="flex justify-center">
            {row.gotInvoice ? (
              <div className="w-6 h-6 rounded-md bg-green-500 flex items-center justify-center">
                <Check className="text-white" size={16} />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-md bg-gray-300"></div>
            )}
          </div>
        ),
      },
      {
        key: "paid",
        header: "Paid",
        render: (row) => (
          <div className="flex justify-center">
            {row.paid ? (
              <div className="w-6 h-6 rounded-md bg-green-500 flex items-center justify-center">
                <Check className="text-white" size={16} />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-md bg-gray-300"></div>
            )}
          </div>
        ),
      },
      {
        key: "onLeave",
        header: "On Leave",
        render: (row) => (
          <div className="flex justify-center">
            {row.onLeave ? (
              <div className="w-6 h-6 rounded-md bg-green-500 flex items-center justify-center">
                <Check className="text-white" size={16} />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-md bg-gray-300"></div>
            )}
          </div>
        ),
      },
      {
        key: "endDate",
        header: "End Date",
      },
      {
        key: "duration",
        header: "Duration",
      },
      {
        key: "reasonForLeave",
        header: "Reason for Leave",
        render: (row) => (
          <div className="flex items-center">
            {row.reasonForLeave}
            <div className="ml-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </div>
        ),
      },
      {
        key: "leaveExplanation",
        header: "Leave Explanation",
      },
      {
        key: "actions",
        header: "Action",
        render: (row) => (
          <div className="flex space-x-2">
            <button className="cursor-pointer w-8 h-8 bg-pink-400 rounded-md flex items-center justify-center">
              <Eye className="text-white" size={16} />
            </button>
            <button className="cursor-pointer w-8 h-8 bg-purple-400 rounded-md flex items-center justify-center">
              <Pencil className="text-white" size={16} />
            </button>
          </div>
        ),
      },
    ];
  
    // Combine columns based on active section
    // const getActiveColumns = (): Column[] => {
    //   switch (activeSection) {
    //     case "personal":
    //       return personalInfoColumns;
    //     case "work":
    //       return workInfoColumns;
    //     case "leave":
    //       return leaveInfoColumns;
    //     default:
    //       return [...personalInfoColumns];
    //   }
    // };
  
    // Action objects
    const actionObj: ActionObject[] = [
      {
        name: "view",
        action: handleView,
      },
      {
        name: "edit",
        action: handleEdit,
      },
    ];
  
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-gray-700 mb-6">Employee Management</h1>
          
          {/* Section tabs */}
          {/* <div className="flex gap-4 border-b mb-4">
            <button 
              onClick={() => setActiveSection("personal")}
              className={`pb-2 px-2 font-medium ${activeSection === "personal" ? "border-b-2 border-purple-500 text-purple-700" : "text-gray-500"}`}
            >
              Personal Information
            </button>
            <button 
              onClick={() => setActiveSection("work")}
              className={`pb-2 px-2 font-medium ${activeSection === "work" ? "border-b-2 border-purple-500 text-purple-700" : "text-gray-500"}`}
            >
              Work Details
            </button>
            <button 
              onClick={() => setActiveSection("leave")}
              className={`pb-2 px-2 font-medium ${activeSection === "leave" ? "border-b-2 border-purple-500 text-purple-700" : "text-gray-500"}`}
            >
              Leave Management
            </button>
          </div> */}
          
          {/* Search and filter */}
          {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-6">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search Employee"
                className="w-full py-2 px-4 bg-gray-100 rounded-lg pr-10"
              />
              <div className="absolute right-3 top-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <select className="bg-gray-100 py-2 px-4 rounded-lg min-w-40">
                <option>All Departments</option>
                <option>Design</option>
                <option>Development</option>
                <option>Marketing</option>
                <option>HR</option>
              </select>
              
              <select className="bg-gray-100 py-2 px-4 rounded-lg min-w-32">
                <option>All Status</option>
                <option>Active</option>
                <option>On Leave</option>
                <option>Emergency</option>
              </select>
            </div>
          </div> */}
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-52">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <DataTable
              columns={columns} 
              data={employees} 
              dividers={false}
              actionBool={activeSection === "leave"} // Only show actions in leave section
              actionObj={actionObj}
            />
          </div>
        )}
        
        {!loading && (
          <StepProgress 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            totalPages={4}
          />
        )}
      </div>
    );
  };
  
  export default EmployeeManagementTable;