import { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import StepProgress from "@/components/StepProgress";
import { Column } from "@/types/tables";
// import { employeeTypeLabels, EmployeeType } from "../../../types/employee";
import { DataTable } from '../../common/DataTable';
import { usePermission } from '@/hooks/use-permission';
import ErrorMessage from "@/components/common/ErrorMessage";
import EmployeeTableSkeleton from "../Dashboard/EmployeeTableSkeleton";
import { useAllEmployees } from "@/api/query-hooks/employee.hooks";
import { EmployeeType } from '@/types/employee';
import { Department } from '../../../types/department';


const employeeTypeLabels: Record<EmployeeType, string> = {
  "full_time": "FT",
  "part_time": "PT",
  "contractor": "FT",
  "nsp": "PT"
};

interface FilterState {
  role: string;
  workType: string;
  employeeType: string;
  status: string;
}

interface DepartmentEmployeeTableProps {
  filterByName?: string;
  department: Department;
}

const DepartmentEmployeeTable: React.FC<DepartmentEmployeeTableProps> = ({ filterByName, department }) => {
 const [currentPage, setCurrentPage] = useState<number>(1);
  const [employeesPerPage] = useState<number>(5);
  const { hasAccess } = usePermission();
  const [filter, setFilter] = useState<FilterState>({
    role: 'All Role',
    workType: 'All Work Type',
    employeeType: 'All Employee Type',
    status: 'All Status'
  });

  // const {
  //   data: employeeData,
  //   isLoading: isEmployeesLoading,
  //   isError: isEmployeesError,
  //   error: employeeError,
  //   refetch: refetchEmployees
  // } = useAllEmployees({}, {});

  const filteredData = useMemo(() => {
    if (!department.employees) return [];
    
    return department.employees.filter(employee => {
      const nameMatch = !filterByName ||
        employee.firstName?.toLowerCase().includes(filterByName.toLowerCase()) ||
        employee.lastName?.toLowerCase().includes(filterByName.toLowerCase());

      const roleMatch = filter.role === 'All Role' || employee.role === filter.role;

      const workTypeMatch = filter.workType === 'All Work Type' || employee.workType === filter.workType;

      const employeeTypeMatch = filter.employeeType === 'All Employee Type' ||
        employee.employeeType === filter.employeeType;

      const statusMatch = filter.status === 'All Status' ||
        (filter.status === 'Available' ? !employee.leaveType : !!employee.leaveType);

      return nameMatch && roleMatch && workTypeMatch && employeeTypeMatch && statusMatch;
    });
  }, [department, filter, filterByName]);

  const totalPages = useMemo(() => {
    return Math.ceil((filteredData ?? []).length / employeesPerPage);
  }, [filteredData, employeesPerPage]);
  
  const paginatedData = useMemo(() => {
    return filteredData?.slice(
      (currentPage - 1) * employeesPerPage,
      currentPage * employeesPerPage
    ) || [];
  }, [filteredData, currentPage, employeesPerPage]);

  const resetFilter = () => {
    setFilter({
      role: 'All Role',
      workType: 'All Work Type',
      employeeType: 'All Employee Type',
      status: 'All Status'
    });
    setCurrentPage(1);
  };

  const fetchData = (page: number) => {
    console.log(`Fetching data for page ${page}`);
    setCurrentPage(page);
  };

  const actionObj = [
    ...(hasAccess("employeeRecords", 'view')
      ? [{
        name: 'view',
        action: () => console.log('View clicked')
      }]
      : []),
    ...(hasAccess("employeeRecords", 'edit')
      ? [{
        name: 'edit',
        action: () => console.log('Edit clicked')
      }]
      : [])
  ];

  const columns: Column[] = [
    {
      key: 'name',
      header: 'Employee Name',
      render: (row) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
            <img
              src={row.photoUrl || '/default-avatar.png'}
              alt={row.firstName || 'Employee'}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{row.firstName} {row.lastName}</div>
            <div className="text-gray-500 text-xs">{row.phone}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Role',
      render: (row) => (
        <div>
          {row.role || department?.name }
        </div>
      )
    },
    {
      key: 'workType',
      header: 'Work Type',
      render: (row) => (
        <div>
          {row.workType || "N/A"}
        </div>
      )
    },
    {
      key: 'employeeType',
      header: 'Employee Type',
      render: (row) => (
        <div className={`px-3 py-2 rounded-[5px] text-center text-xs ${
          row.employeeType === 'full_time'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-purple-100 text-purple-800'
        }`}>
          {employeeTypeLabels[row.employeeType as EmployeeType] || "N/A"}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <div className={`px-3 py-2 rounded-[5px] text-center text-xs ${
          !row.leaveType
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {!row.leaveType ? "Available" : "Busy"}
        </div>
      )
    },
  ];



  return (
    <div className="rounded-lg bg-white py-6">
      {/* Filter Section */}
      <div className="flex mb-4 px-[22px] gap-3 justify-between items-center">
        {/* Role Filter */}
        <Select
          value={filter.role}
          onValueChange={(value) => {
            setFilter(prev => ({ ...prev, role: value }));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[320px] py-[25px] rounded-lg text-gray-500 hover:text-black font-normal bg-gray-100 border-none">
            <SelectValue placeholder="All Role" />
          </SelectTrigger>
          <SelectContent>

            <SelectItem value="All Role">All Role</SelectItem>
            <SelectItem value="Graphic Design">Graphic Design</SelectItem>
            <SelectItem value="Copywriter">Copywriter</SelectItem>
          </SelectContent>
        </Select>

        {/* Work Type Filter */}
        <Select
          value={filter.workType}
          onValueChange={(value) => {
            setFilter(prev => ({ ...prev, workType: value }));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[320px] py-[25px] rounded-lg text-gray-500 hover:text-black font-normal bg-gray-100 border-none">
            <SelectValue placeholder="All Work Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Work Type">All Work Type</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>

        {/* Employee Type Filter */}
        <Select
          value={filter.employeeType}
          onValueChange={(value) => {
            setFilter(prev => ({ ...prev, employeeType: value }));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[320px] py-[25px] rounded-lg text-gray-500 hover:text-black font-normal bg-gray-100 border-none">
            <SelectValue placeholder="All Employee Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Employee Type">All Employee Type</SelectItem>
            <SelectItem value="full_time">Full Time</SelectItem>
            <SelectItem value="part_time">Part Time</SelectItem>
            <SelectItem value="contractor">Contractor</SelectItem>
            <SelectItem value="nsp">NSP</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select
          value={filter.status}
          onValueChange={(value) => {
            setFilter(prev => ({ ...prev, status: value }));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[320px] py-[25px] rounded-lg text-gray-500 hover:text-black font-normal bg-gray-100 border-none">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Status">All Status</SelectItem>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="Busy">Busy</SelectItem>
          </SelectContent>
        </Select>

        {/* Reset Filter Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={resetFilter}
          className="border-none rounded-lg bg-gray-100 text-gray-500 hover:text-black font-normal w-[100px] py-[25px]"
        >
          <X className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {paginatedData.length > 0 ? 
        <>
        <DataTable
          columns={columns}
          data={paginatedData}
          actionBool={true}
          actionObj={actionObj}
          dividers={false}
        />
        <div className="mt-4">
          <StepProgress
            currentPage={currentPage}
            setCurrentPage={fetchData}
            totalPages={totalPages}
          />
        </div>
        </>
        :
        <div className="flex w-full h-full items-center justify-center py-8">No Employees In This Department </div>
      }
    </div>
  );
};

export default DepartmentEmployeeTable;