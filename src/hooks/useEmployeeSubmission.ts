import {
    useUpdateEmployee,
    useEmployeeDetails,
} from "@/api/query-hooks/employee.hooks";
import { UpdateEmployeeInterface, Employee, EmployeeType, WorkType } from "@/types/employee";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Country, State } from "react-country-state-city/dist/esm/types";
import { toast } from "@/hooks/use-toast";
import { getApiErrorMessage } from "@/api/errorHandler";



enum LeaveType {
  QUIT = "quit",
  LAYOFF = "layoff",
  DISMISSED = "dismissed",
  OTHER = "other",
}


export const useEmployeeSubmission = (employeeId: number, employee: Employee, countries: Country[], states:State[]) => {
  const updateEmployeeMutation = useUpdateEmployee();
//   const { data: employeeData } = useEmployeeDetails(employeeId.toString());
    const { departments } = useSelector(
        (state: RootState) => state.sharedState
    );

  const handleSubmit = useCallback(
    (values: any, { setSubmitting }: any) => {
      try {
        const selectedCountry = countries.find(c => c.id === values.countryId);
            
        const selectedState = states.find(s => s.id === values.stateId );
        
            // Transform form values to UpdateEmployeeInterface
        const updateEmployeeDto: UpdateEmployeeInterface = {
            user: { id: employee?.user?.id || 0 },
            firstName: values.firstName || employee?.firstName,
            lastName: values.lastName || employee?.lastName,
            phone: values.phone || employee?.phone,
            departmentId: values.department?.id || employee?.departmentId,
            department:
            departments.find(
                (department) => department.id === values.department?.id
            ) || employee?.department,
            position: values.position || employee?.position,
            hireDate: values.hireDate || employee?.hireDate,
            endDate: values.endDate || employee?.endDate,
            employeeType:
            (values.employeeType as EmployeeType) || employee?.employeeType,
            workType: (values.workType as WorkType) || employee?.workType,
            leaveType: (values.leaveType as LeaveType) || employee?.leaveType,
            leaveExplanation: values.leaveExplanation || employee?.leaveExplanation,
            notes: values.notes || employee?.notes,
            contactDetails:
            values.personalEmail ||
            values.homeAddress ||
            values.city ||
            values.stateId ||
            values.countryId
                ? {
                    personalEmail:
                    values.personalEmail || employee?.contactDetails?.personalEmail,
                    homeAddress:
                    values.homeAddress || employee?.contactDetails?.homeAddress,
                    country: selectedCountry?.name || "",
                    region: selectedState?.name || "",
                    city: values.city,
                }
                : employee?.contactDetails,
            birthDate: values.birthDate || employee?.birthDate,
            sickDaysBalance: employee?.sickDaysBalance || employee?.sickDaysBalance,
            vacationDaysBalance:
            employee?.vacationDaysBalance || employee?.vacationDaysBalance,
            annualDaysOff: employee?.annualDaysOff || employee?.annualDaysOff,
            skills: values?.skills || employee?.skills,
        };
    
        // Call the update mutation
        console.log("Update Employee DTO", updateEmployeeDto);
        updateEmployeeMutation.mutate({ id: employeeId, data: updateEmployeeDto });

      } catch (error) {
        const errorMessage = getApiErrorMessage(error);
        toast({
          title: "Error Editing Employee",
          description: "Failed To Edit Employee" + errorMessage.message,
          variant: "destructive",
        });
        setSubmitting(false);
      }
    },
    [employeeId, employee, updateEmployeeMutation]
  );
  

  return {
    handleSubmit,
    isSubmitting: updateEmployeeMutation.isPending,
  };
};
