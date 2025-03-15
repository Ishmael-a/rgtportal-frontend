import EmployeeCard from "@/components/Hr/Employees/EmployeeCard";
import EmployeeCardSkeleton from "@/components/Hr/Employees/EmployeeCardSkeleton";
import { useAllEmployees } from "@/api/query-hooks/employee.hooks"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import NoEmployeesPage from "@/pages/common/NoEmployeesPage"

const EmployeeDirectory = () => {
    const {
      data: employees,
      isLoading: isEmployeesLoading,
      isError: isEmployeesError,
      error, refetch, isFetching 
    } = useAllEmployees(
      {},
      {}
    );

    if (isEmployeesLoading) {
      return <EmployeeCardSkeleton />;
    }

    if(!employees || employees.length <= 0){
      return (
      <div className="bg-gray-50 p-6 flex flex-col gap-[15px] pt-[10px] h-full ">
        <section className="h-[62px] flex justify-between w-full items-center py-1">
            {/* Title and subtitle */}
            <div className="flex flex-col h-full gap-1">
              <h1 className="text-xl font-medium text-gray-600">
                Employee Cards
              </h1>
              <p className="text-sm text-gray-500">
                These are all current employees working at RGT
              </p>
            </div>
        </section>

        <NoEmployeesPage />
      </div>
      )
    }

  if (isEmployeesError) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error loading Employees data</AlertTitle>
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "Failed to load data. Please try again."}
          </AlertDescription>
        </Alert>
        <Button onClick={() => refetch()} variant="outline" className="mt-4">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }


  return (
    <div className="bg-gray-50 p-6 flex flex-col gap-[15px] pt-[10px] h-full ">
      <section className="h-[62px] flex justify-between w-full items-center py-1">
          {/* Title and subtitle */}
          <div className="flex flex-col h-full gap-1">
            <h1 className="text-xl font-medium text-gray-600">
              Employee Cards
            </h1>
            <p className="text-sm text-gray-500">
              These are all current employees working at RGT
            </p>
          </div>
      </section>

      <div className="flex flex-wrap gap-4  ">
          {employees?.map(employeeCard => (
            <EmployeeCard key={employeeCard.id} employee={employeeCard} />
          ))}
      </div>
    </div>
  );
};

export default EmployeeDirectory;