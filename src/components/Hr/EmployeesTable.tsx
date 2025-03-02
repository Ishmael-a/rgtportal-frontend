import { useState, useEffect } from 'react';
import { DataTable } from '../common/DataTable';
import {StepProgress} from "../StepProgress";
import { Column, ActionObject } from "@/types/tables";
import CustomSelect from "@/components/common/Select";
 

export interface Employee {
    id: number;
    name: string;
    department: string;
    role: string;
    type: string;  // e.g. "Remote", "Onsite", "Hybrid"
    status: string;  // e.g. "NSP", "Active", "On Leave"
    // Add additional employee properties as needed
    email?: string;
    phone?: string;
    hireDate?: string;
    manager?: string;
  }


interface EmployeeTableState {
    currentPage: number;
    employees: Employee[];
    loading: boolean;
    error: string | null;
  }
  
  const EmployeeTable: React.FC = () => {
    const [state, setState] = useState<EmployeeTableState>({
      currentPage: 1,
      employees: [],
      loading: true,
      error: null
    });
    
    const { currentPage, employees, loading, error } = state;
    
    // Mock data to match the UI in the image
    const mockData: Employee[] = [
      {
        id: 1,
        name: "Enchill Beckham",
        department: "Design",
        role: "Graphic Design",
        type: "Remote",
        status: "NSP"
      },
      {
        id: 2,
        name: "01 Mar 2023",
        department: "01 Mar 2023",
        role: "Graphic Design",
        type: "Remote",
        status: "NSP"
      },
      {
        id: 3,
        name: "01 Mar 2023",
        department: "01 Mar 2023",
        role: "Graphic Design",
        type: "Remote",
        status: "NSP"
      }
    ];
    
    // Set the current page
    const setCurrentPage = (page: number): void => {
      setState(prev => ({ ...prev, currentPage: page }));
    };
    
    // Simulating paginated data fetch
    useEffect(() => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real app, you would fetch data based on the current page
      // For example: fetchEmployees(currentPage)
      const fetchData = async (): Promise<void> => {
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          setState(prev => ({ 
            ...prev, 
            employees: mockData,
            loading: false 
          }));
        } catch (err) {
          setState(prev => ({ 
            ...prev, 
            loading: false, 
            error: err instanceof Error ? err.message : 'An unknown error occurred' 
          }));
        }
      };
      
      fetchData();
    }, [currentPage]);
  
    // View action handler
    const handleView = (id?: number): void => {
      console.log(`Viewing employee with ID: ${id}`);
      // Implement view logic
    };
  
    // Edit action handler
    const handleEdit = (id?: number): void => {
      console.log(`Editing employee with ID: ${id}`);
      // Implement edit logic
    };
  
  
    // Define table columns
    const columns: Column[] = [
      {
        key: "name",
        header: "Employee Name",
      },
      {
        key: "department",
        header: "Department",
      },
      {
        key: "role",
        header: "Role",
      },
      {
        key: "type",
        header: "Type",
      },
      {
        key: "status",
        header: "Status",
        render: (row) => (
          <div className="bg-purple-300 text-white px-2 py-1 rounded-md text-center w-16">
            {row.status}
          </div>
        ),
        cellClassName: () => "flex items-center justify-center",
      }
    ];

  
    // Action objects
    const actionObj: ActionObject[] = [
      {
        name: "view",
        action: () => handleView(),
      },
      {
        name: "edit",
        action: () => handleEdit(),
      },
    ];
  
    return (
      <div className="p-6 bg-gray-50 rounded-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-gray-700 mb-6">Employees</h1>
          
          {/* Search and filter */}
          <div className="flex flex-col gap-8  sm:flex-row sm:items-center mb-6">
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
            
            <div className="flex w-full gap-1 md:gap-3  justify-between items-center my-4 md:my-8">           
                <CustomSelect placeholder={"All Departments"} className={"w-40 md:min-w-62 "} options={["All Departments"]} />
                <CustomSelect placeholder={"All Type"} className={"w-40 md:min-w-62"} options={["All Type"]} />
                <CustomSelect placeholder={"All Status"}  className={"w-40 md:min-w-62"} options={["All Status"]} />
            </div>
          </div>
        </div>
        
        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
            Error: {error}
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center h-52">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <DataTable
            columns={columns} 
            data={employees} 
            dividers={false}
            actionBool={true}
            actionObj={actionObj}
          />
        )}
        
        {/* We're passing the current page, setter, and total pages to StepProgress */}
        {!loading && (
          <StepProgress 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            totalPages={4} // In a real app, this would come from the API
          />
        )}
      </div>
    );
  };
  
  export default EmployeeTable;