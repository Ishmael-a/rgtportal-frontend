import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import EmployeeTimeOffManagementTable, { FilterState } from "@/components/Hr/Employees/EmployeeTimeOffManagementTable";
import { useRequestPto } from "@/hooks/usePtoRequests";
import { useAuthContextProvider } from "@/hooks/useAuthContextProvider";
import { useEffect, useState } from "react";
import { FilterConfig } from "@/components/common/Filters";
import { PtoLeave } from "@/types/PTOS";

const EmployeeTimeOffRequests = () => {
  const { currentUser } = useAuthContextProvider();
  const departmentId = currentUser?.employee?.departmentId as number;
  // Only fetch department PTOs if departmentId is valid
  const { departmentPtos, isDepartmentPtoLoading } =
    useRequestPto(departmentId);
  const [filter, setFilter] = useState<FilterState>({
    type: "All Type",
    status: "All Status",
    dateRange: undefined,
  });

  const resetFilter = () => {
    setFilter({
      type: "All Type",
      status: "All Status",
      dateRange: undefined,
    });
  };


  const filterConfigs: FilterConfig[] = [
    {
      type: "select",
      options: ["All Type", "Engagement", "Unwell", "Emergency"],
      value: filter.type,
      onChange: (value) => setFilter((prev) => ({ ...prev, type: value })),
    },
    {
      type: "select",
      options: ["All Status", "Pending", "Approved", "Rejected"],
      value: filter.status,
      onChange: (value) => setFilter((prev) => ({ ...prev, status: value })),
    },
    {
      type: "date",
      placeholder: "Pick a date range",
      value: filter.dateRange,
      onChange: (value) => setFilter((prev) => ({ ...prev, dateRange: value })),
    },
  ];


  const filterData = (data: PtoLeave[] | undefined): PtoLeave[] => {
    if (!data) return [];

    return data.filter((item) => {
      // Filter by type
      if (filter.type !== "All Type" && item.type.toLocaleLowerCase() !== filter.type.toLocaleLowerCase()) {
        return false;
      }

      // Filter by status
      if (filter.status !== "All Status" && item.status?.toLocaleLowerCase() !== filter.status.toLocaleLowerCase()) {
        return false;
      }

      console.log("filter.dateRange", filter.dateRange)

      // Filter by date range
      if (filter.dateRange?.from && filter.dateRange?.to) {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);
        const filterStartDate = new Date(filter.dateRange.from);
        const filterEndDate = new Date(filter.dateRange.to);
        
        console.log("startDate:", startDate)
        console.log("endDate:", endDate)
        console.log("filterStartDate:", filterStartDate)

        if (
          (startDate >= filterStartDate && startDate <= filterEndDate) || // PTO starts within the range
          (endDate >= filterStartDate && endDate <= filterEndDate) || // PTO ends within the range
          (startDate <= filterStartDate && endDate >= filterEndDate) // PTO spans the entire range
        ) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    });
  };

  const filteredData = filterData(departmentPtos);


  

  useEffect(() => {
    console.log("Department ID:", departmentId);
  }, [departmentId]);


  

  return (
    <>
      <div className="flex flex-col gap-[15px] pt-[10px] h-full ">
        <section className="h-[62px] flex justify-between w-full items-center py-1">
          {/* Title */}
          <h1 className="text-2xl font-medium text-gray-600">
            Employee TimeOff Requestsdadfas
          </h1>

          <div className="md:flex md:flex-row gap-4 items-center h-full flex-col">
            <div className="relative justify-between items-center sm:w-[100px] md:w-[301px] md:max-w-[301px] flex-grow">
              <Input
                type="text"
                placeholder="Search Employee"
                className="pl-5 py-5 rounded-xl bg-gray-50 border-none outline-none shadow-none h-full"
              />
              <Search className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
            </div>

            <Button
              onClick={() => {}}
              className="bg-white text-gray-400 hover:bg-gray-100 rounded-xl h-full"
            >
              <img src={"/Filter 3.svg"} />
              Filter
            </Button>
          </div>
        </section>

        {/* Manage Employees Table Section */}

        <EmployeeTimeOffManagementTable
          initialData={filteredData || []}
          isDataLoading={isDepartmentPtoLoading}
          filters={filterConfigs}
          onReset={resetFilter}
        />
      </div>
    </>
  );
};

export default EmployeeTimeOffRequests;
