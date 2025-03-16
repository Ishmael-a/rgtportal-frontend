import React, { useState, useMemo } from 'react';
import StepProgress from "@/components/StepProgress";
import { Column, ActionObject } from "@/types/tables";
import { DataTable } from '../../common/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {timeOffData} from '@/constants';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../../ui/select';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { Calendar } from '../../ui/calendar';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '../../ui/popover';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { format, parse, isWithinInterval } from 'date-fns';
import { SideModal } from "@/components/ui/side-dialog";
import ConfirmCancelModal from "@/components/common/ConfirmCancelModal"


export interface timeOffManagementTableProps {
  initialData: timeOffData[];
  pageSize?: number;
}

export interface FilterState {
  type: string;
  status: string;
  dateRange?: DateRange;
}


const EmployeeTimeOffManagementTable: React.FC<timeOffManagementTableProps> = ({ 
  initialData, 
  pageSize = 5 
}) => {
  const [employees, setEmployees] = useState<timeOffData[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState<timeOffData | null>(null);

  const [rejectModalOpen, setRejectModalOpen] = React.useState<boolean>(false);
  const [approveModalOpen, setApproveModalOpen] = React.useState<boolean>(false);
  const [reason, setReason] = React.useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const [currentRowId, setCurrentRowId] = React.useState<number | null>(null);

  const handleReject = (): void => {
    if (currentRowId !== null) {
      console.log('Rejected with reason:', reason);
      handleStatusChange(currentRowId, 'rejected');
      setRejectModalOpen(false);
      setReason('');
      setCurrentRowId(null);
    }
  };  

  const handleApprove = (): void => {
    if (currentRowId !== null) {
      console.log('Approved');
      handleStatusChange(currentRowId, 'approved');
      setApproveModalOpen(false);
      setCurrentRowId(null);
    }
  };

  const [filter, setFilter] = useState<FilterState>({
    type: 'All Type',
    status: 'All Status',
    dateRange: undefined
  });

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const typeMatch = filter.type === 'All Type' || 
        (filter.type === 'Engagement' && emp.reason === 'Engagement') ||
        (filter.type === 'Unwell' && emp.reason === 'Unwell') ||
        (filter.type === 'Emergency' && emp.reason === 'Emergency');

      const statusMatch = filter.status === 'All Status' || 
        emp.status === filter.status.toLowerCase();

      const dateMatch = !filter.dateRange?.from || !filter.dateRange?.to || 
        isWithinInterval(
          parse(emp.from, 'dd MMM yyyy', new Date()),
          { 
            start: filter.dateRange.from!, 
            end: filter.dateRange.to! 
          }
        );

      return typeMatch && statusMatch && dateMatch;
    });
  }, [employees, filter]);

  // Reset filter
  const resetFilter = () => {
    setFilter({ 
      type: 'All Type', 
      status: 'All Status', 
      dateRange: undefined 
    });
  };



  const handleStatusChange = (employeeId: number, newStatus: 'approved' | 'rejected') => {
    setEmployees(prevEmployees => 
      prevEmployees.map(emp => 
        emp.id === employeeId ? { ...emp, status: newStatus } : emp
      )
    );
  };

  // Pagination
  const paginatedData = filteredEmployees.slice(
    (currentPage - 1) * pageSize, 
    currentPage * pageSize
  );

  const columns: Column[] = [
    {
      key: 'employeeName',
      header: 'Employee Name',
      render: (row) => (
        <div className="flex items-center">
          <span>{row.employeeName}</span>
        </div>
      )
    },
    {
      key: 'from',
      header: 'From',
    },
    {
      key: 'to',
      header: 'To',
    },
    {
      key: 'total',
      header: 'Total',
    },
    {
      key: 'reason',
      header: 'Reason',
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => {
        if (row.status === 'pending') {
          return (
            <div className="flex justify-between space-x-2 w-full">
              <Button 
                onClick={() => {
                  setCurrentRowId(row.id!);
                  setApproveModalOpen(true);
                }}
                // onClick={() => handleStatusChange(row.id!, 'approved')}
                className="bg-greenaccent3 w-1/2 text-confirmgreen px-2 py-1 rounded hover:bg-green-200"
              >
                Approve
              </Button>
              <Button 
                onClick={() => {
                  setCurrentRowId(row.id!);
                  setRejectModalOpen(true);
                }}
                className="bg-redaccent3 w-1/2 text-cancelred px-2 py-1 rounded hover:bg-pink-200"
                >
                Reject
              </Button>
            </div>
          );
        }
        else if(row.status === 'approved'){
          return (
            <Button 
                onClick={() => {
                  setCurrentRowId(row.id!);
                  setRejectModalOpen(true);
                }}
                className="bg-redaccent3 w-full text-cancelred px-2 py-1 rounded hover:bg-pink-200"
              >
                Reject
              </Button>

            )
        }
        else{
            return (              
              <Button 
                onClick={() => {
                  setCurrentRowId(row.id!);
                  setApproveModalOpen(true);
                }}
                className="bg-greenaccent3 w-full text-confirmgreen px-2 py-1 rounded hover:bg-green-200"
              >
                Approve
              </Button>
            )
        }
      }
    }
  ];

  const actionColumns:ActionObject[] = [
    {
      name: 'view',
      action: (_id?: number, row?: timeOffData) => {
        
        if (row) {
            setIsModalOpen(true);
            setSelectedEmployee(row);
        }
      },
    }
  ];

  return (
  <>
    <div className="space-y-4 bg-white py-4 ">

      {/* Filter Section */}
      <div className="flex flex-wrap px-[22px]  gap-3 justify-between items-center">
        {/* Date Range Picker */}
        {/* <div className="flex-grow min-w-auto "> */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[320px] py-[25px] rounded-lg justify-start text-left font-normal bg-gray-100 border-none",
                !filter.dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filter.dateRange?.from ? (
                filter.dateRange.to ? (
                  <>
                    {format(filter.dateRange.from, "LLL dd, y")} -{" "}
                    {format(filter.dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(filter.dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={filter.dateRange?.from}
              selected={filter.dateRange}
              onSelect={(range) => setFilter(prev => ({ ...prev, dateRange: range }))}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        {/* </div> */}

        {/* Type Filter */}
        <Select 
          value={filter.type}
          onValueChange={(value) => setFilter(prev => ({ ...prev, type: value }))}
        >
          <SelectTrigger className="w-[320px] py-[25px] rounded-lg text-gray-500  hover:text-black font-normal bg-gray-100 border-none">
            <SelectValue placeholder="All Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Type">All Type</SelectItem>
            <SelectItem value="Engagement">Engagement</SelectItem>
            <SelectItem value="Unwell">Unwell</SelectItem>
            <SelectItem value="Emergency">Emergency</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select 
          value={filter.status}
          onValueChange={(value) => setFilter(prev => ({ ...prev, status: value }))}
        >
          <SelectTrigger className="w-[320px] py-[25px] rounded-lg text-gray-500  hover:text-black font-normal bg-gray-100 border-none">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Status">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        {/* Reset Filter Button */}
        <Button 
          variant="outline" 
          size="icon"
          onClick={resetFilter}
          className="border-none rounded-lg bg-gray-100 text-gray-500  hover:text-black font-normal w-[100px] py-[25px]"
        >
          <X className="h-4 w-4" />
          Reset
        </Button>
      </div>


      <DataTable 
        columns={columns}
        data={paginatedData}
        actionObj={actionColumns}
      />
      <div className="mt-4 flex justify-center ">
        <StepProgress 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil(filteredEmployees.length / pageSize)}
        />
      </div>
    </div>

    <ConfirmCancelModal
      isOpen={rejectModalOpen}
      onOpenChange={setRejectModalOpen}
      title="Are you sure you want to reject?"
      onSubmit={handleReject}
      onCancel={() => {
          setRejectModalOpen(false);
          setCurrentRowId(null);
        }}
    >
      <div className="space-y-2">
        <p className="text-sm text-gray-500">Provide a Reason</p>
        <Textarea 
          className="w-full"
          rows={2}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason here..."
        />
        <p className="text-xs text-gray-400">We can't let you go at the moment</p>
      </div>
    </ConfirmCancelModal>

    <ConfirmCancelModal
      isOpen={approveModalOpen}
      onOpenChange={setApproveModalOpen}
      title="Are you sure you want to approve?"
      onSubmit={handleApprove}
       onCancel={() => {
          setApproveModalOpen(false);
          setCurrentRowId(null);
        }}
    />


    { isModalOpen && (     
      <SideModal
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
        title="Approve Or Reject Request"
        showCloseButton={true}
        position="right"
        size="md"
        headerClassName="w-full px-12 "
        className="flex flex-col w-full items-center"
      >
        <div className=" p-6 flex flex-col ">
            {/* Employee Name */}
            <div className="mb-4">
                <label className="text-sm text-gray-300">Employee Name</label>
                <Input value={selectedEmployee?.employeeName} readOnly className="h-12 rounded-lg text-gray-400 mt-1 bg-gray-100 border-none shadow-none" />
            </div>

            {/* Date Fields */}
            <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                <label className="text-sm text-gray-300">From</label>
                <div className="relative">
                    <Input value={selectedEmployee?.from} readOnly className="h-12 rounded-lg text-gray-400 mt-1 bg-gray-100 pr-10 border-none shadow-none" />
                </div>
                </div>

                <div className="w-1/2">
                    <label className="text-sm text-gray-300">To</label>
                    <div className="relative">
                        <Input value={selectedEmployee?.to} readOnly className="h-12 rounded-lg text-gray-400 mt-1 bg-gray-100  pr-10 border-none shadow-none" />
                    </div>
                </div>
            </div>

            {/* Reason */}
            <div>
                <label className="text-sm text-gray-300">Reason</label>
                <Textarea value={selectedEmployee?.reason} readOnly className="h-28 rounded-lg text-gray-400 mt-1 bg-gray-100 border-none shadow-none" />
            </div>
        </div>
      </SideModal>
    )}
  </>
  );
};


export default EmployeeTimeOffManagementTable;
