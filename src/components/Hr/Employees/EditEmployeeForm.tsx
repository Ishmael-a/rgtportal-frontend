import React, { useState, useEffect } from "react";
import {
  Field,
  FieldProps,
  FieldInputProps,
  Formik,
  Form as FormikForm,
  FormikProps as formikProps,
} from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  CalendarIcon,
  Home,
  MapPin,
  Globe,
  FileText,
  Briefcase,
  Users,
  Loader
} from "lucide-react";
import {
  EmployeeType,
  WorkType,
  UpdateEmployeeInterface,
} from "@/types/employee";
import {
  useUpdateEmployee,
  useEmployeeDetails,
} from "@/api/query-hooks/employee.hooks";
import { SideModal } from "@/components/ui/side-dialog";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  GetCountries,
  GetState,
  GetAllCities,
  CountrySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { Country, State, City } from "react-country-state-city/dist/esm/types";

export enum LeaveType {
  QUIT = "quit",
  LAYOFF = "layoff",
  DISMISSED = "dismissed",
  OTHER = "other",
}

export enum EmployeeTypeEnum {
  FULL_TIME = "full_time",
  PART_TIME = "part_time",
  CONTRACTOR = "contractor",
  NSP = "nsp",
}

export enum WorkTypeEnum {
  HYBRID = "hybrid",
  REMOTE = "remote",
}

export enum RoleTypeEnum {
  EMPLOYEE = "1",
  HR = "2",
  MANAGER = "3",
  ADMIN = "4",
  MARKETER = "5",
}


const EditEmployeeSchema = Yup.object().shape({
  department: Yup.object().shape({
    id: Yup.number(),
  }),
  personalEmail: Yup.string().email("Invalid email address"),
  phone: Yup.string(),
  employeeType: Yup.string().oneOf(Object.values(EmployeeTypeEnum)),
  //   workType: Yup.string().oneOf(Object.values(WorkTypeEnum)),
  roleId: Yup.string().oneOf(Object.values(RoleTypeEnum)),
  hireDate: Yup.date().nullable(),
  endDate: Yup.date().nullable(),
  leaveType: Yup.string().oneOf(Object.values(LeaveType)).nullable(),
  leaveExplanation: Yup.string().when("leaveType", {
    is: (val: string) => val && val !== "",
    then: (schema) =>
      schema.required("Explanation is required when leave reason is provided"),
    otherwise: (schema) => schema.nullable(),
  }),
  notes: Yup.string().nullable(),
  homeAddress: Yup.string().nullable(),
  countryCode: Yup.string().nullable(),
  stateCode: Yup.string().nullable(),
  city: Yup.string().nullable(),
  birthDate: Yup.date().nullable(),
});

interface EditEmployeeFormProps {
  employeeId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const EditEmployeeForm: React.FC<EditEmployeeFormProps> = ({
  employeeId,
  isOpen,
  onClose,
}) => {
    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);



    const { departments } = useSelector(
        (state: RootState) => state.sharedState
    );
    const updateEmployeeMutation = useUpdateEmployee();


  // Fetch employee data
  const { data: employeeData, isLoading: isLoadingEmployee } =
    useEmployeeDetails(employeeId.toString());

  const employee = employeeData?.data ;


  const handleFormSubmit = (values: any) => {
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
        values.region ||
        values.country
          ? {
              personalEmail:
                values.personalEmail || employee?.contactDetails?.personalEmail,
              homeAddress:
                values.homeAddress || employee?.contactDetails?.homeAddress,
              country: countries.find(c => c.isoCode === values.countryCode)?.name || "",
              region: states.find(s => s.isoCode === values.stateCode)?.name || "",
              city: values.city,
            }
          : employee?.contactDetails,
      birthDate: values.birthDate || employee?.birthDate,
      sickDaysBalance: employee?.sickDaysBalance || employee?.sickDaysBalance,
      vacationDaysBalance:
        employee?.vacationDaysBalance || employee?.vacationDaysBalance,
      annualDaysOff: employee?.annualDaysOff || employee?.annualDaysOff,
      skills: employee?.skills || employee?.skills,
    };

    // Call the update mutation
    console.log("Update Employee DTO", updateEmployeeDto);
    // updateEmployeeMutation.mutate({ id: employeeId, data: updateEmployeeDto });
  };

  // Initial form values
  const initialValues = {
    department: {
      id: employee?.department?.id || 0,
      name: employee?.department?.name || "",
    },
    personalEmail: employee?.contactDetails?.personalEmail || "",
    phone: employee?.phone || "",
    employeeType: employee?.employeeType || EmployeeTypeEnum.FULL_TIME,
    workType: employee?.workType || WorkTypeEnum.HYBRID,
    hireDate: employee?.hireDate || null,
    endDate: employee?.endDate || null,
    leaveType: employee?.leaveType || "",
    leaveExplanation: employee?.leaveExplanation || "",
    notes: employee?.notes || "",
    homeAddress: employee?.contactDetails?.homeAddress || "",
    city: employee?.contactDetails?.city || "",
    stateCode: employee?.contactDetails?.region || "",
    countryCode: employee?.contactDetails?.country || "",
    birthDate: employee?.birthDate || null,
  };

  return (
    <>
      <SideModal
        isOpen={isOpen}
        onOpenChange={() => {
          if (!updateEmployeeMutation.isPending) {
            onClose();
          }
        }}
        title="Edit Employee"
        position="right"
        size={"full"}
        contentClassName=" min-w-4xl"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={EditEmployeeSchema}
          onSubmit={handleFormSubmit}
        >
          {(formikProps) => {
            useEffect(() => {
                const loadCountries = async () => {
                    const countriesData = await GetCountries();
                    console.log(countriesData);
                    setCountries(countriesData);
                    
                    // Set initial country code if employee has country data
                    if (employee?.contactDetails?.country) {
                        const initialCountry = countriesData.find(
                        c => c.name === employee.contactDetails?.country
                        );
                        if (initialCountry) {
                            formikProps.setFieldValue('countryCode', initialCountry.iso2);
                        }
                    }
                };
                loadCountries();
            }, []);

            useEffect(() => {
                const loadStates = async () => {
                    if (formikProps.values.countryCode) {
                    const statesData = await GetState(formikProps.values.countryCode);
                    console.log("States Data",statesData);
                    setStates(statesData);

                    // Set initial state code if employee has region data
                    if (employee?.contactDetails?.region) {
                        const initialState = statesData.find(
                            s => s.name === employee.contactDetails?.region
                        );
                        if (initialState) {
                            formikProps.setFieldValue('stateCode', initialState.state_code);
                        }
                    }
                    } else {
                    setStates([]);
                    }
                };
                loadStates();
            }, [formikProps.values.countryCode]);

            useEffect(() => {
                const loadCities = async () => {
                    if (formikProps.values.countryCode && formikProps.values.stateCode) {
                    const citiesData = await GetAllCities(
                        // formikProps.values.countryCode,
                        formikProps.values.stateCode
                    );
                    setCities(citiesData);

                    // Set initial city if exists
                    if (employee?.contactDetails?.city) {
                        formikProps.setFieldValue('city', employee.contactDetails.city);
                    }
                    } else {
                    setCities([]);
                    }
                };
                loadCities();
            }, [formikProps.values.countryCode, formikProps.values.stateCode]);

            return (
              <>
                <FormikForm className="space-x-6 space-y-12 min-w-4xl grid grid-cols-2 my-6 ">
                  {/* Department Field */}
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-sm font-medium">
                      Department
                    </Label>
                    <Field name="department.id">
                      {({ field, form, meta }: FieldProps) => (
                        <div className="relative">
                          <Select
                            onValueChange={(value) =>
                              form.setFieldValue("department", {
                                id: parseInt(value),
                                name:
                                  departments?.find(
                                    (d) => d.id.toString() === value
                                  )?.name || "",
                              })
                            }
                            defaultValue={field.value?.toString() || ""}
                          >
                            <SelectTrigger
                              id="department"
                              className="w-full py-6 z-[2010]"
                            >
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent
                              position="popper"
                              className="z-[2010]"
                            >
                              <SelectGroup>
                                <SelectLabel>Departments</SelectLabel>
                                {departments?.length ? (
                                  departments.map((dept) => (
                                    <SelectItem
                                      key={dept.id}
                                      value={dept.id.toString()}
                                    >
                                      {dept.name}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem value="no-departments" disabled>
                                    No departments available
                                  </SelectItem>
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>

                  {/* Personal Email Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="personalEmail"
                      className="text-sm font-medium"
                    >
                      Personal Email
                    </Label>
                    <Field name="personalEmail">
                      {({
                        field,
                        form: { touched, errors },
                      }: {
                        field: FieldInputProps<string>;
                        form: any;
                      }) => (
                        <div>
                          <div className="relative">
                            <Input
                              id="personalEmail"
                              type="email"
                              placeholder="Enter personal email"
                              {...field}
                              className={`w-full py-6 px-4 ${
                                touched.personalEmail && errors.personalEmail
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                          </div>
                          {touched.personalEmail && errors.personalEmail && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.personalEmail}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>

                  {/* Phone Number Field */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <Field name="phone">
                      {({
                        field,
                        form: { touched, errors },
                      }: {
                        field: FieldInputProps<string>;
                        form: any;
                      }) => (
                        <div>
                          <div className="relative">
                            <Input
                              id="phone"
                              type="text"
                              placeholder="Enter phone number"
                              {...field}
                              className={`w-full py-6 px-4 ${
                                touched.phone && errors.phone
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                          </div>
                          {touched.phone && errors.phone && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.phone}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>

                  {/* Employee Skills Field */}
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-sm font-medium">
                      Skills
                    </Label>
                    <Field name="skills">
                      {({ field, form, meta }: FieldProps) => (
                        <div className="relative">
                          <Select
                            onValueChange={(value) =>
                              form.setFieldValue("department", {
                                id: parseInt(value),
                                name:
                                  departments?.find(
                                    (d) => d.id.toString() === value
                                  )?.name || "",
                              })
                            }
                            defaultValue={field.value?.toString() || ""}
                          >
                            <SelectTrigger
                              id="department"
                              className="w-full py-6 z-[2010]"
                            >
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent
                              position="popper"
                              className="z-[2010]"
                            >
                              <SelectGroup>
                                <SelectLabel>Departments</SelectLabel>
                                {departments?.length ? (
                                  departments.map((dept) => (
                                    <SelectItem
                                      key={dept.id}
                                      value={dept.id.toString()}
                                    >
                                      {dept.name}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem value="no-departments" disabled>
                                    No departments available
                                  </SelectItem>
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>

                  {/* Employee Type Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="employeeType"
                      className="text-sm font-medium"
                    >
                      Fulltime/ Part time
                    </Label>
                    <Field name="employeeType">
                      {({ field, form, meta }: FieldProps) => (
                        <div className="relative">
                          <Select
                            onValueChange={(value) =>
                              form.setFieldValue(field.name, value)
                            }
                            onOpenChange={(open) => {
                              if (!open) {
                                window.event?.stopPropagation();
                              }
                            }}
                            defaultValue={field.value}
                          >
                            <SelectTrigger
                              id="employeeType"
                              className="w-full py-6 "
                            >
                              <SelectValue placeholder="Select employee type" />
                            </SelectTrigger>
                            <SelectContent
                              position="popper"
                              className="z-[2010]"
                            >
                              <SelectGroup>
                                <SelectLabel>Employee Type</SelectLabel>
                                <SelectItem value={EmployeeTypeEnum.FULL_TIME}>
                                  Full Time
                                </SelectItem>
                                <SelectItem value={EmployeeTypeEnum.PART_TIME}>
                                  Part Time
                                </SelectItem>
                                <SelectItem value={EmployeeTypeEnum.CONTRACTOR}>
                                  Contractor
                                </SelectItem>
                                <SelectItem value={EmployeeTypeEnum.NSP}>
                                  NSP
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>

                  {/* Work Type Field */}
                  <div className="space-y-2">
                    <Label htmlFor="workType" className="text-sm font-medium">
                      User Type
                    </Label>
                    <Field name="workType">
                      {({ field, form, meta }: FieldProps) => (
                        <div className="relative">
                          <Select
                            onValueChange={(value) =>
                              form.setFieldValue(field.name, value)
                            }
                            defaultValue={field.value}
                          >
                            <SelectTrigger
                              id="workType"
                              className="w-full py-6"
                            >
                              <SelectValue placeholder="Select work type" />
                            </SelectTrigger>
                            <SelectContent
                              position="popper"
                              className="z-[2010]"
                            >
                              <SelectGroup>
                                <SelectLabel>User Type</SelectLabel>
                                <SelectItem value={RoleTypeEnum.EMPLOYEE}>
                                  Employee
                                </SelectItem>
                                <SelectItem value={RoleTypeEnum.HR}>
                                  Hr
                                </SelectItem>
                                <SelectItem value={RoleTypeEnum.MANAGER}>
                                  Manager
                                </SelectItem>
                                <SelectItem value={RoleTypeEnum.MARKETER}>
                                  Marketer
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>

                  {/* Start Date Field */}
                  <div className="space-y-2">
                    <Label htmlFor="hireDate" className="text-sm font-medium">
                      Start Date
                    </Label>
                    <Field name="hireDate">
                      {({ field, form, meta }: FieldProps) => (
                        <div className="relative">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="hireDate"
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal py-6",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(new Date(field.value), "PPP")
                                ) : (
                                  <span>Select start date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0 z-[2000]"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) =>
                                  form.setFieldValue(field.name, date)
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>

                  {/* End Date Field */}
                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-sm font-medium">
                      End Date
                    </Label>
                    <Field name="endDate">
                      {({ field, form, meta }: FieldProps) => (
                        <div className="relative">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="endDate"
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal py-6",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(new Date(field.value), "PPP")
                                ) : (
                                  <span>Select end date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0 z-[2000]"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) =>
                                  form.setFieldValue(field.name, date)
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>

                  {/* Reason For Leave Field */}
                  <div className="space-y-2">
                    <Label htmlFor="leaveType" className="text-sm font-medium">
                      Reason For Leave
                    </Label>
                    <Field name="leaveType">
                      {({ field, form, meta }: FieldProps) => (
                        <div className="relative">
                          <Select
                            onValueChange={(value) =>
                              form.setFieldValue(field.name, value)
                            }
                            defaultValue={field.value}
                          >
                            <SelectTrigger
                              id="leaveType"
                              className="w-full py-6"
                            >
                              <SelectValue placeholder="Select reason for leave" />
                            </SelectTrigger>
                            <SelectContent
                              position="popper"
                              className="z-[2010]"
                            >
                              <SelectGroup>
                                <SelectLabel>Reason For Leave</SelectLabel>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value={LeaveType.QUIT}>
                                  Quit
                                </SelectItem>
                                <SelectItem value={LeaveType.LAYOFF}>
                                  Laid Off
                                </SelectItem>
                                <SelectItem value={LeaveType.DISMISSED}>
                                  Dismissed
                                </SelectItem>
                                <SelectItem value={LeaveType.OTHER}>
                                  Other
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>

                  {/* Birthday Field */}
                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="text-sm font-medium">
                      Birthday
                    </Label>
                    <Field name="birthDate">
                      {({ field, form, meta }: FieldProps) => (
                        <div className="relative">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="birthDate"
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal py-6",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(new Date(field.value), "PPP")
                                ) : (
                                  <span>Select birthday</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0 z-[2000]"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) =>
                                  form.setFieldValue(field.name, date)
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>

                  {/* Leave Explanation Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="leaveExplanation"
                      className="text-sm font-medium"
                    >
                      Leave Explanation
                    </Label>
                    <Field name="leaveExplanation">
                      {({
                        field,
                        form: { touched, errors },
                      }: {
                        field: FieldInputProps<string>;
                        form: any;
                      }) => (
                        <div>
                          <div className="relative">
                            <Textarea
                              id="leaveExplanation"
                              placeholder="Write something..."
                              {...field}
                              className={`w-full min-h-[100px] px-6 py-2 ${
                                touched.leaveExplanation &&
                                errors.leaveExplanation
                                  ? "border-red-500"
                                  : ""
                              }`}
                              maxLength={500}
                            />
                            <div className="text-xs text-gray-500 text-right mt-1">
                              {field.value?.length || 0}/500 Characters
                            </div>
                          </div>
                          {touched.leaveExplanation &&
                            errors.leaveExplanation && (
                              <div className="text-red-500 text-sm mt-1">
                                {errors.leaveExplanation}
                              </div>
                            )}
                        </div>
                      )}
                    </Field>
                  </div>

                  {/* Notes Field */}
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-sm font-medium">
                      Notes
                    </Label>
                    <Field name="notes">
                      {({
                        field,
                        form: { touched, errors },
                      }: {
                        field: FieldInputProps<string>;
                        form: any;
                      }) => (
                        <div>
                          <div className="relative">
                            <Textarea
                              id="notes"
                              placeholder="Write something..."
                              {...field}
                              className={`w-full min-h-[100px] px-6 py-2 ${
                                touched.notes && errors.notes
                                  ? "border-red-500"
                                  : ""
                              }`}
                              maxLength={500}
                            />
                            <FileText className="absolute right-3 top-2 h-5 w-5 text-gray-500" />
                            <div className="text-xs text-gray-500 text-right mt-1">
                              {field.value?.length || 0}/500 Characters
                            </div>
                          </div>
                          {touched.notes && errors.notes && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.notes}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>

                  {/* Home Address Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="homeAddress"
                      className="text-sm font-medium"
                    >
                      Home Address
                    </Label>
                    <Field name="homeAddress">
                      {({
                        field,
                        form: { touched, errors },
                      }: {
                        field: FieldInputProps<string>;
                        form: any;
                      }) => (
                        <div>
                          <div className="relative">
                            <Input
                              id="homeAddress"
                              type="text"
                              placeholder="Enter home address"
                              {...field}
                              className={`w-full py-6 px-4 ${
                                touched.homeAddress && errors.homeAddress
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                            <Home className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                          </div>
                          {touched.homeAddress && errors.homeAddress && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.homeAddress}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>

                  {/* Country Field */}
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-medium">
                      Country
                    </Label>
                    <Field name="countryCode">
                    {({ field, form, meta }: FieldProps) => (
                        <div className="space-y-2">
                        {/* <Label htmlFor="country" className="text-sm font-medium">
                            Country
                        </Label> */}
                        <div className="relative">
                            <CountrySelect
                                onChange={(country:Country) => {
                                    form.setFieldValue("countryCode", country?.iso2 || "");
                                    form.setFieldValue("stateCode", "");
                                    form.setFieldValue("city", "");
                                }}
                                value={
                                    countries.find((c) => c.isoCode === field.value) || null
                                }
                                placeHolder="Select Country"
                                containerClassName="w-full"
                                inputClassName="w-full py-6 border rounded-md px-3"
                            />
                            {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                                {meta.error}
                            </div>
                            )}
                            {/* <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" /> */}
                        </div>
                        </div>
                    )}
                    </Field>
                    {/* <Field name="countryCode">
                      {({ field, form, meta }: FieldProps) => (
                        <div className="relative">
                          <Select
                            onValueChange={(value) => {
                                const country = countries.find((c) => c.isoCode === value);
                                form.setFieldValue("countryCode", value);
                                form.setFieldValue("stateCode", "");
                                form.setFieldValue("city", "");
                            }}
                            value={field.value || ""} // Add empty string as fallback
                          >
                            <SelectTrigger id="country" className="w-full py-6">
                                <SelectValue placeholder="Select country">
                                    {field.value 
                                    ? countries.find((c) => c.isoCode === field.value)?.name 
                                    : "Select country"}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent
                              position="popper"
                              className="z-[2010]"
                            >
                              <SelectGroup>
                                <SelectLabel>Countries</SelectLabel>
                                {countries.map((country) => (
                                  <SelectItem
                                    key={country.isoCode}
                                    value={country.isoCode}
                                  >
                                    {country.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                          <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                        </div>
                      )}
                    </Field> */}
                  </div>

                  {/* Region (State) Field */}
                  <div className="space-y-2">
                    <Label htmlFor="region" className="text-sm font-medium">
                      Region/State
                    </Label>
                    <Field name="stateCode">
                      {({ field, form, meta }: FieldProps) => (
                        <div className="relative">
                          <Select
                            onValueChange={(value) => {
                                form.setFieldValue("stateCode", value);
                                form.setFieldValue("city", "");
                            }}
                            value={field.value || ""} 
                            disabled={!formikProps.values.countryCode} 
                            >
                            <SelectTrigger id="region" className="w-full py-6">
                                <SelectValue placeholder="Select region/state" />
                            </SelectTrigger>
                            <SelectContent
                              position="popper"
                              className="z-[2010]"
                            >
                              <SelectGroup>
                                <SelectLabel>Regions/States</SelectLabel>
                                {states.map((state) => (
                                  <SelectItem
                                    key={state.isoCode}
                                    value={state.isoCode}
                                  >
                                    {state.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>

                  {/* City Field */}
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium">
                      City
                    </Label>
                    <Field name="city">
                      {({ field, form, meta }: FieldProps) => (
                        <div className="relative">
                          <Select
                            onValueChange={(value) => form.setFieldValue("city", value)}
                            value={field.value || ""} 
                            disabled={!formikProps.values.stateCode} 
                          >
                            <SelectTrigger id="city" className="w-full py-6">
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                            <SelectContent
                              position="popper"
                              className="z-[2010]"
                            >
                              <SelectGroup>
                                <SelectLabel>Cities</SelectLabel>
                                {cities.map((city) => (
                                  <SelectItem key={city.name} value={city.name}>
                                    {city.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                        </div>
                      )}
                    </Field>
                  </div>
                </FormikForm>

                <div className="flex w-full gap-3 mt-8 h-14">
                  <button
                    type="button"
                    onClick={() =>
                      !updateEmployeeMutation.isPending && onClose()
                    }
                    disabled={updateEmployeeMutation.isPending}
                    className={`w-1/2 h-full px-6 py-2 border border-[#E328AF] text-[#E328AF] rounded-md transition-colors cursor-pointer ${
                      updateEmployeeMutation.isPending
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-pink-100 duration-300 ease-in"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={formikProps.submitForm}
                    disabled={
                      updateEmployeeMutation.isPending || !formikProps.isValid
                    }
                    className={`w-1/2 h-full px-6 py-2 bg-[#E328AF] text-white rounded-md transition-colors cursor-pointer ${
                      updateEmployeeMutation.isPending || !formikProps.isValid
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-pink-400 duration-300 ease-in"
                    }`}
                  >
                    {updateEmployeeMutation.isPending ? (
                      <span className="flex items-center">
                        <Loader className="animate-spin h-4 w-4 mr-2" />
                        Processing...
                      </span>
                    ) : (
                      "Create"
                    )}
                  </button>
                </div>
              </>
            );}}
        </Formik>
      </SideModal>
    </>
  );
};
