import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Field, FieldArray, FieldInputProps, FormikHelpers, FieldProps, FormikErrors, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { format } from "date-fns";

import { Calendar as CalendarIcon } from "lucide-react";
import { Plus, Trash } from "lucide-react";

import {
  hrannouncements,
  announcements,
  events,
  eventList,
  dummyProjects,
  EventType
} from "@/constants";

import UserIcon from "@/assets/icons/UserIcon"

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AnnouncementCard from "@/components/AnnouncementCard";
import EventList from "@/components/EventList";
import EventsCalendar from "@/components/Hr/Events/EventsCalendar";
import { SideFormModal } from "@/components/Modal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Employee } from "@/types/employee";
import { Event, CreateEventDto } from "@/types/events";
import { getApiErrorMessage } from "@/api/errorHandler";

import { useAllEmployees } from "@/api/query-hooks/employee.hooks";
import { useCreateEvent } from "@/api/query-hooks/event.hooks";
import { toast } from "@/hooks/use-toast";
import { useAuthContextProvider } from "@/hooks/useAuthContextProvider";


interface CreateEventResult { success: boolean; response: Event | null; error: Error | null  }


interface ISpecialEventTypes {
  id: "1" | "2";
  label: string;
}

const formTypes = [
  { id: '1', label: 'Special Event' },
  { id: '2', label: 'Anouncement' },
  { id: '3', label: 'Recognition' }
];

const specialEventTypes: ISpecialEventTypes[] = [
  { id: '1', label: 'Holiday' },
  { id: '2', label: 'Birthday' },
];

interface PopoverStates {
  [index: number]: boolean;
}

type FormValues = 
  | SpecialEventFormValues 
  | AnnouncementFormValues 
  | RecognitionFormValues;

// Specific interfaces for each form type
interface SpecialEventFormValues {
  formType: '1';
  eventType: string;
  holidayName?: string;
  employeeName?: string;
  date: Date;
}

interface AnnouncementFormValues {
  formType: '2';
  title: string;
  description: string;
  date: Date;
}

interface RecognitionFormValues {
  formType: '3';
  title: string;
  recognitionList: {
    employeeName: string;
    projectName: string;
  }[];
}

const Events = () => {
  const {currentUser} = useAuthContextProvider();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const [selectedFormType, setSelectedFormType] = useState('1');
  const [selectedSpecialEventType, setSelectedSpecialEventType] = useState<"1" | "2">('1');
  
  const [projectOpen, setProjectOpen] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const [popoverOpenStates, setPopoverOpenStates] = useState<PopoverStates>({});
  const [projectPopoverOpenStates, setProjectPopoverOpenStates] = useState<PopoverStates>({});

  const createEventMutation = useCreateEvent();

  const handlePopoverOpenChange = (index: number, open: boolean) => {
    setPopoverOpenStates((prevStates) => ({
      ...prevStates,
      [index]: open,
    }));
  };

  const handleProjectPopoverOpenChange = (index: number, open: boolean) => {
    setProjectPopoverOpenStates((prevStates) => ({
      ...prevStates,
      [index]: open,
    }));
  };

  const {
    data: users = [], 
    isLoading: isEmployeesLoading,
    isError: isEmployeesError
  } = useAllEmployees(
    {},
    {
      enabled: isModalOpen
    }
  );

//   const {
//     data: projects = [],
//     isLoading: isProjectsLoading,
//     isError: isProjectsError
//   } = useAllProjects(
//     {},
//     {
//         enabled: isModalOpen
//     }
//     );

  const getEventInitialValues = () => {
    switch (selectedSpecialEventType) {
      case "1":
        return {
          eventType: specialEventTypes[0].label, 
          holidayName: "",
          date: new Date()
        };
      case "2":
        return {
          eventType: specialEventTypes[1].label, 
          employeeName: "",
          date: new Date()
        };
      default:
        return {
          eventType: specialEventTypes[0].label,
          employeeName: "",
          date: new Date()
        };
    }
  };

  const getEventValidationSchema = () => {
    switch (selectedSpecialEventType) {
      case "1":
        return Yup.object({
          eventType: Yup.string().required('Event type is required'),
          holidayName: Yup.string()
            .min(3, "A minimum of three characters is required")
            .max(100, "A max of 100 characters is required")
            .required('Holiday name is required'),
          date: Yup.date().required('Date of holiday is required'),
        });
      case "2":
        return Yup.object({
          eventType: Yup.string().required('Event type is required'),
          employeeName: Yup.string().required('Employee name is required'),
          date: Yup.date().required('Date of event is required'),
        });
      default:
        return Yup.object({
          eventType: Yup.string().required('Event type is required'),
          employeeName: Yup.string().required('Employee name is required'),
          date: Yup.date().required('Date of event is required'),
        });
    }
  };

  const getInitialValues = (formType: string): FormValues => {
    switch (formType) {
      case '1':
        return {
          formType: '1',
          ...getEventInitialValues(),
        };
      case '2':
        return {
          formType: '2',
          title: "",
          description: "",
          date: new Date(),
        };
      case '3':
        return {
          formType: '3',
          title: '',
          recognitionList: [
            {
              employeeName: "",
              projectName: ""
            }
          ]
        };
      default:
        return {
          formType: '1',
          ...getEventInitialValues(),
        };
    }
  };

  const getValidationSchema = (formType: string) => {
    switch (formType) {
      case '1':
        return Yup.object({
          formType: Yup.string().required("Form Type is required"),
          ...getEventValidationSchema().fields
        });
      case '2':
        return Yup.object({
          formType: Yup.string().required(),
          title: Yup.string().required('Announcement name is required'),
          description: Yup.string()
            .min(3, "A minimum of three characters is required")
            .required('Description is required'),
          date: Yup.date().required('Date of event is required'),
        });
      case '3':
        return Yup.object({
          formType: Yup.string().required(),
          title: Yup.string().required('Recognition title is required'),
          recognitionList: Yup.array()
            .of(
              Yup.object().shape({
                employeeName: Yup.string()
                  .trim()
                  .required('Employee name is required'),
                projectName: Yup.string()
                  .trim()
                  .required('Project name is required')
                  .min(2, 'Project name must be at least 2 characters')
                  .max(200, 'Project name cannot exceed 200 characters')
              })
            )
            .min(1, 'At least one recognition list is required')
            .required('Recognition list is required') 
        });
      default:
        return Yup.object({});
    }
  };

  const renderEventTypeFields = (selectedSpecialEventType: string) => {
    switch (selectedSpecialEventType) {
      case "1":
        return (
          <div className="space-y-4">
            <Field name="holidayName">
              {({ field, form: { touched, errors } }: { field: FieldInputProps<string>; form: any }) => (
                <div className="">
                  <label htmlFor="holidayName" className="text-sm font-semibold text-gray-700 mb-1 block">
                    Holiday Name
                  </label>
                  <Input
                    id="holidayName"
                    type="text"
                    placeholder="Enter the holiday name"
                    {...field}
                    className={` w-full bg-gray-100 placeholder:text-gray-400  focus-visible:ring-1 focus-visible:ring-rgtpurpleaccent3  py-6 px-4 ${touched.holidayName && errors.holidayName ? "border-red-500" : ""}`}
                  />
                  {touched.holidayName && errors.holidayName && 
                    <div className="text-red-500 text-sm mt-1">{errors.holidayName}</div>
                  }
                </div>
              )}
            </Field>

            <Field name="date">
              {({ field, form }: { field: FieldInputProps<string>; form: any }) => (
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="date"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Pick the Date
                  </label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left  font-normal py-6 px-4 bg-gray-100",
                          !form.values.date && "text-muted-foreground"
                        )}
                      >
                        {form.values.date ? (
                          format(form.values.date, "PPP")
                        ) : (
                          <span className="text-gray-500 font-semibold mx-1">Select date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 text-gray-500 opacity-50" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0 z-[2000]" align="start">
                      <Calendar
                        className="w-full"
                        mode="single"
                        selected={form.values.date}
                        onSelect={(date) => {
                          form.setFieldValue(field.name, date);
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  {form.touched.date && form.errors.date && (
                    <div className="text-red-500 text-sm mt-1">
                      {form.errors.date}
                    </div>
                  )}
                </div>
              )}
            </Field>
          </div>
        );
      case "2":
        return (
          <div className="space-y-4">
          <Field name="employeeName">
            {({ field, form: { values, touched, errors, setFieldValue } }: { field: FieldInputProps<string>; form: any }) => {
              // Get the current field value
              const employeeNameValue = values.employeeName || '';
              
              // Find the selected employee from the users array
              const selectedEmployee = users.find(emp => 
                emp.id.toString() === employeeNameValue?.toString() // Ensure string comparison
              );

              console.log('Form value:', values.employeeName, 'Type:', typeof employeeNameValue);
              
              // Create the display name for the input
              const displayName = selectedEmployee 
                ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}`
                : ''; // Empty string when no employee is selected

              return (
                <div className="flex flex-col space-y-2">
                  <label htmlFor="employeeName" className="text-sm font-semibold text-gray-700 mb-1 block">
                    Employee
                  </label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <div className="relative">
                        <Input
                          id="employeeName"
                          value={displayName}
                          onChange={(e) => {
                            setOpen(true);
                          }}
                          onClick={() => setOpen(true)}
                          placeholder="Select employee"
                          className={`w-full bg-gray-100 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-rgtpurpleaccent3 py-6 px-4 ${touched.employeeName && errors.employeeName ? "border-red-500" : ""}`}
                        />
                        {touched.employeeName && errors.employeeName && (
                          <div className="text-red-500 text-sm mt-1">{errors.employeeName}</div>
                        )}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[370px] p-0 z-[2000]" align="start">
                      <Command>
                        <CommandInput placeholder="Search employees..." />
                        <CommandList>
                          <CommandEmpty>No employees found.</CommandEmpty>
                          <CommandGroup>
                            {users.map((employee) => (
                              <CommandItem
                                key={employee.id}
                                value={`${employee.firstName} ${employee.lastName}`}
                                onSelect={() => {
                                  setFieldValue(field.name, employee.id.toString());
                                  setOpen(false);
                                }}
                              >
                                <div className="flex justify-between w-full py-[13px]">
                                  <div className="flex gap-2 items-center">
                                    <UserIcon />
                                    <span className="flex">
                                      {employee.firstName} {employee.lastName}
                                    </span>
                                  </div>
                                  <span className="text-muted-foreground text-sm">
                                    {employee.department?.name || "No Department"}
                                  </span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              );
            }}
          </Field>

            <Field name="date">
              {({ field, form }: { field: FieldInputProps<string>; form: any }) => (
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="date"
                    className="text-sm font-semibold text-gray-700  block"
                  >
                    Pick the Date
                  </label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left  font-normal py-6 px-4 bg-gray-100 focus-visible:ring-1 focus-visible:ring-rgtpurpleaccent3",
                          !form.values.date && "text-muted-foreground"
                        )}
                      >
                        {form.values.date ? (
                          format(form.values.date, "PPP")
                        ) : (
                          <span className="text-gray-500 font-semibold mx-1">Select date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 text-gray-400" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0 z-[2000]" align="start">
                      <Calendar
                        mode="single"
                        selected={form.values.date}
                        onSelect={(date) => {
                          form.setFieldValue(field.name, date);
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  {form.touched.date && form.errors.date && (
                    <div className="text-red-500 text-sm mt-1">
                      {form.errors.date}
                    </div>
                  )}
                </div>
              )}
            </Field>
          </div>
        );
      default:
        return (<div>No Special Event type Selected</div>);
    }
  };

  const renderFormFields = (formType: string) => {
    switch (formType) {
      case '1':
        return (
          <>
            <div className="mb-4">
              <div className="flex space-x-2">
                {specialEventTypes.map((eventType) => (
                  <Button
                    key={eventType.id}
                    type="button"
                    onClick={() => {
                      setSelectedSpecialEventType(eventType.id);
                    }}
                    className={`
                      ${selectedSpecialEventType === eventType.id
                        ? 'bg-pinkaccentsharp text-white hover:bg-pinkaccentsharp'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
                      px-4 py-[10px] rounded-[8px] transition-colors 
                    `}
                  >
                    {eventType.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              {renderEventTypeFields(selectedSpecialEventType)}
            </div>
          </>
        );
      case '2':
        return (
          <>
            <div className="space-y-4">
              <Field name="title">
                {({ field, form: { touched, errors } }: { field: FieldInputProps<string>; form: any }) => (
                  <div>
                    <label htmlFor="title" className="text-sm font-semibold text-gray-700 mb-1 block">
                      Title
                    </label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Enter announcement title"
                      {...field}
                      className={` w-full bg-gray-100 placeholder:text-gray-400  focus-visible:ring-1 focus-visible:ring-rgtpurpleaccent3  py-6 px-4 ${touched.title && errors.title ? "border-red-500" : ""}`}
                    />
                    {touched.title && errors.title && (
                      <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                    )}
                  </div>
                )}
              </Field>

              <Field name="description">
                {({ field, form: { touched, errors } }: { field: FieldInputProps<string>; form: any }) => (
                  <div>
                    <label htmlFor="description" className="text-sm font-semibold text-gray-700 mb-1 block">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      placeholder="Enter announcement description"
                      {...field}
                      className={` w-full h-[88px] bg-gray-100 placeholder:text-gray-400  focus-visible:ring-1 focus-visible:ring-rgtpurpleaccent3  py-4 px-4 border rounded ${touched.description && errors.description ? "border-red-500" : ""}`}
                      rows={4}
                    />
                    {touched.description && errors.description && (
                      <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                    )}
                  </div>
                )}
              </Field>

              <Field name="date">
                {({ field, form }: { field: FieldInputProps<string>; form: any }) => (
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="date" className="text-sm font-semibold text-gray-700 mb-1 block">
                      Announcement Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left  font-normal py-6 px-4 bg-gray-100 focus-visible:ring-1 focus-visible:ring-rgtpurpleaccent3",
                            !form.values.date && "text-muted-foreground"
                          )}
                        >
                          {form.values.date ? (
                            format(form.values.date, "PPP")
                          ) : (
                            <span className="text-gray-500 font-semibold mx-1">Select date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 z-[2000]" align="start">
                        <Calendar
                          mode="single"
                          selected={form.values.date}
                          onSelect={(date) => {
                            form.setFieldValue(field.name, date);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {form.touched.date && form.errors.date && (
                      <div className="text-red-500 text-sm mt-1">{form.errors.date}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
          </>
        );
      case '3':
        return (
          <>
            <Field name="title">
              {({ field, form: { touched, errors } }: { field: FieldInputProps<string>; form: any }) => (
                <div className="mb-4">
                  <label htmlFor="title" className="text-sm font-semibold text-gray-700 mb-1 block">
                    Recognition Title
                  </label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Dedicated...Let's Lock In"
                    {...field}
                    className={` w-full bg-gray-100 placeholder:text-gray-400  focus-visible:ring-1 focus-visible:ring-rgtpurpleaccent3  py-6 px-4 ${touched.title && errors.title ? "border-red-500" : ""}`}
                  />
                  {touched.title && errors.title && (
                    <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                  )}
                </div>
              )}
            </Field>

            <FieldArray name="recognitionList">
              {({ remove, push, form }: any) => (
                <div className="space-y-4">
                  <div className="flex flex-col gap-4 ">
                    <h3 className="text-sm font-semibold text-gray-700 mb-1 block">Make The List For The Week</h3>
                    <div className="w-full text-left flex">
                      <p className="w-1/2  text-sm font-medium">Project Name</p>
                      <p className="w-1/2  text-sm font-medium">Project Name</p>
                    </div>
                  </div>

                  {(form.values.recognitionList || []).map((_: any, index: number) => (
                    <div key={index} className=" space-y-4">
                      <div className="flex gap-1 items-center">
                        <Field name={`recognitionList.${index}.employeeName`}>
                          {({ field, form: { values, touched, errors, setFieldValue, setFieldTouched } }: { field: FieldInputProps<string>; form: any }) => {
                            const [hasOpened, setHasOpened] = useState(false);
                            const employeeNameValue = values.employeeName || '';
                            // const selectedEmployee = users.find(emp => emp.id === employeeNameValue);
                            // const displayName = selectedEmployee ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}` : '';
                            const employeeError = touched.recognitionList?.[index]?.employeeName && errors.recognitionList?.[index]?.employeeName;

                            return (
                              <div className="w-full">
                                <Popover
                                  open={popoverOpenStates[index] || false}
                                  onOpenChange={(open) => handlePopoverOpenChange(index, open)}
                                >
                                  <PopoverTrigger asChild>
                                    <div className="relative">
                                      <Input
                                        {...field}
                                        id={`recognitionList.${index}.employeeName`}
                                        value={values.recognitionList[index].employeeName ? 
                                          `${users.find(u => u.id === values.recognitionList[index].employeeName)?.firstName} ${users.find(u => u.id === values.recognitionList[index].employeeName)?.lastName}` : 
                                          ''}
                                        onClick={() => {
                                          handlePopoverOpenChange(index, true);
                                          setHasOpened(true);
                                        }}
                                        placeholder="Select employee"
                                        className={`w-full bg-gray-100 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-rgtpurpleaccent3 py-6 px-4 ${employeeError ? "border-red-500" : ""}`}
                                        onBlur={() => {
                                          if (!hasOpened) {
                                            setFieldTouched(`recognitionList.${index}.employeeName`, true);
                                          }
                                        }}
                                      />
                                      {employeeError && (
                                        <div className="text-red-500 text-sm mt-1">{employeeError}</div>
                                      )}
                                    </div>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-[370px] p-0 z-[2000]" align="start">
                                    <Command>
                                      <CommandInput placeholder="Search employees..." />
                                      <CommandList>
                                        <CommandEmpty>No employees found.</CommandEmpty>
                                        <CommandGroup>
                                          {users
                                              .filter((employee) => {
                                                // Check if the employee is already selected in recognitionList
                                                return !values.recognitionList.some(
                                                  (item: any) => item.employeeName === employee.id
                                                );
                                              })
                                              .map((employee) => (
                                                <CommandItem
                                                  key={employee.id}
                                                  value={`${employee.firstName} ${employee.lastName}`}
                                                  onSelect={() => {
                                                    setFieldValue(field.name, employee.id);
                                                    handlePopoverOpenChange(index, false);
                                                  }}
                                                >
                                                  <div className="flex justify-between w-full py-[13px]">
                                                    <div className="flex gap-2 items-center">
                                                      <UserIcon />
                                                      <span className="flex">
                                                        {employee.firstName} {employee.lastName}
                                                      </span>
                                                    </div>
                                                    <span className="text-muted-foreground text-sm">
                                                      {employee.department?.name || "No Department"}
                                                    </span>
                                                  </div>
                                                </CommandItem>
                                              ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                              </div>
                            );
                          }}
                        </Field>

                        <Field name={`recognitionList.${index}.projectName`}>
                          {({ field, form: { values, touched, errors, setFieldValue, setFieldTouched } }: { field: FieldInputProps<string>; form: any }) => {
                            const [hasOpenedProject, setHasOpenedProject] = useState(false);
                            const projectError = touched.recognitionList?.[index]?.projectName && errors.recognitionList?.[index]?.projectName;

                            return (
                              <div className="w-full">
                                <Popover
                                  open={projectPopoverOpenStates[index] || false}
                                  onOpenChange={(open) => handleProjectPopoverOpenChange(index, open)}
                                >
                                  <PopoverTrigger asChild>
                                    <div className="relative">
                                      <Input
                                        {...field}
                                        id={`recognitionList.${index}.projectName`}
                                        value={values.recognitionList[index].projectName ? 
                                          dummyProjects.find(p => p.id === values.recognitionList[index].projectName)?.name : 
                                          ''}
                                        onClick={() => {
                                          handleProjectPopoverOpenChange(index, true);
                                          setHasOpenedProject(true);
                                        }}
                                        placeholder="Select project"
                                        className={`w-full bg-gray-100 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-rgtpurpleaccent3 py-6 px-4 ${projectError ? "border-red-500" : ""}`}
                                        onBlur={() => {
                                          if (!hasOpenedProject) {
                                            setFieldTouched(`recognitionList.${index}.projectName`, true);
                                          }
                                        }}
                                      />
                                      {projectError && (
                                        <div className="text-red-500 text-sm mt-1">{projectError}</div>
                                      )}
                                    </div>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-[370px] p-0 z-[2000]" align="start">
                                    <Command>
                                      <CommandInput placeholder="Search projects..." />
                                      <CommandList>
                                        <CommandEmpty>No projects found.</CommandEmpty>
                                        <CommandGroup>
                                          {dummyProjects.map((project) => (
                                            <CommandItem
                                              key={project.id}
                                              value={project.name}
                                              onSelect={() => {
                                                setFieldValue(`recognitionList.${index}.projectName`, project.id);
                                                handleProjectPopoverOpenChange(index, false);
                                              }}
                                            >
                                              <div className="flex justify-between w-full py-[13px]">
                                                <div className="flex gap-2 items-center">
                                                  <span className="flex">{project.name}</span>
                                                </div>
                                                <span className="text-muted-foreground text-sm">
                                                  {project.status}
                                                </span>
                                              </div>
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                              </div>
                            );
                          }}
                        </Field>

                        {form.values.recognitionList.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:bg-white hover:text-red-700 py-6"
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                  <div>
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => push({ employeeName: '', projectName: '' })}
                      className="text-rgtpurpleaccent2 text-sm py-2 items-center justify-start hover:underline"
                    >
                      <Plus />
                      Add Another
                    </Button>
                  </div>
                </div>
              )}
            </FieldArray>
          </>
        );
      default:
        return null;
    }
  };


const handleSubmit = async (
  values: FormValues, 
  { 
    setSubmitting, 
    setErrors, 
    resetForm 
  }: FormikHelpers<FormValues>
) => {
  try {
    setSubmitting(true);

    const createEventPayload = transformFormValuesToEventDto(values);

    const result = await createEvent(createEventPayload);

    if (!result.success) {
      throw result.error;
    }

    toast({
      title: "Success",
      description: "Event created successfully",
      variant: "default"
    });

    resetForm();
    setIsModalOpen(false);

  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const validationErrors: { [key: string]: string } = {};
      
      error.inner.forEach((err) => {
        if (err.path) {
          validationErrors[err.path] = err.message;
        }
      });
      
      setErrors(validationErrors);
    } 
    else {
      const errorMessage = getApiErrorMessage(error);
      
      toast({
        title: "Error",
        description: errorMessage.message,
        variant: "destructive"
      });
    }
  } finally {
    setSubmitting(false);
  }
};



  // Transform form values to CreateEventDto
  const transformFormValuesToEventDto = (values: FormValues): CreateEventDto => {

    switch (values.formType) {
      case '1': {
        // Special Event (Holiday or Birthday)
        const specialEvent = values as SpecialEventFormValues;
        const startOfDay = new Date(specialEvent.date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(specialEvent.date);
        endOfDay.setHours(23, 59, 59, 999);

        return {
          title: specialEvent.eventType === 'Holiday' 
            ? specialEvent.holidayName || 'Holiday Event' 
            : `${specialEvent.employeeName || 'Employee'} Birthday`,
          description: specialEvent.eventType,
          startTime: startOfDay,
          endTime: endOfDay,
          type: specialEvent.eventType === 'Holiday' 
            ? EventType.HOLIDAY 
            : EventType.BIRTHDAY,
             
        };
      }
      case '2': {
        // Announcement
        const announcement = values as AnnouncementFormValues;
        const startOfDay = new Date(announcement.date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(announcement.date);
        endOfDay.setHours(23, 59, 59, 999);
        return {
          title: announcement.title,
          description: announcement.description,
          startTime: startOfDay,
          endTime: endOfDay,
          type: EventType.ANNOUNCEMENT,
        };
      }
      case '3': {
        // Recognition
        const recognition = values as RecognitionFormValues;
        const today = new Date();
        const startOfToday = new Date(today.setHours(0, 0, 0, 0)); 
        const endOfWeek = new Date(today.setDate(today.getDate() + 7));
        endOfWeek.setHours(23, 59, 59, 999); 

        return {
          title: recognition.title,
          description: recognition.recognitionList
            .map(item => `${item.employeeName} - ${item.projectName}`)
            .join('; '),
          startTime: startOfToday, 
          endTime: endOfWeek,
          type: EventType.OTHER,
        };
      }
      default:
        throw new Error('Invalid form type');
    }
  };


  const createEvent = async (data: CreateEventDto): Promise<CreateEventResult> => {
    try {
    console.log("Calling Create event Submit", data)
    
    const response = await createEventMutation.mutateAsync({ data: data });
    console.log("Loffing Create event response", response)

      if (!response.success) {
        return { 
          success: false,
          response: null, 
          error: new Error(response.message || 'An unknown error occurred') 
        };
      }

      return { 
        success: true,
        response: response.data!, 
        error: null 
      };
    } catch (error) {
      return { 
        success: false,
        response: null, 
        error: getApiErrorMessage(error) 
      };
    }
  }
    

  return (
    <>
      <div className="flex flex-col gap-[15px] pt-[10px] h-full px-4">
        <section className="h-[62px] flex justify-between w-full items-center py-1">
          {/* Title */}
          <div className="text-left flex flex-col gap-2">
            <h1 className="text-2xl font-medium text-gray-600">Events</h1>
            <h1 className="text-sm font-medium text-gray-400">These are your events so far</h1>
          </div>

          <div className="md:flex md:flex-row items-center h-full">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-rgtviolet hover:bg-violet-900 cursor-pointer text-white font-medium text-sm py-6 transition-colors duration-300 ease-in"
            >
              <img src="/Add.svg" alt="add" />
              New Event
            </Button>
          </div>
        </section>

        <section className="flex sm:flex-col md:flex-row gap-4">
          <div className="flex justify-center h-screen w-[40%] overflow-y-auto">
            <div className="pt-5 space-y-3 h-fit order-2 bg-white rounded-t-2xl w-full">
              <div className="px-4 flex items-center justify-between pb-4">
                <p className="text-[#706D8A] font-[700] text-2xl">Upcoming Events</p>
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                classNames={{
                  day_selected:
                    "bg-[#C0AFFF] text-white hover:bg-[#C0AFFF] focus:bg-[#C0AFFF] rounded-full",
                  month: "flex flex-col space-y-3 flex-grow",
                  day: "w-8 h-8 sm:w-10 sm:h-10 font-medium rounded-full",
                  head_cell: "w-8 sm:w-10 flex-grow",
                  cell: "flex items-center justify-center flex-grow",
                }}
                className="shadow-md shadow-gray-300 p-2 rounded-md flex flex-col w-full h-full"
              />

              <div className="p-4 bg-white rounded-lg space-y-5">
                <div className="flex items-center justify-between">
                  <p className="text-[#706D8A] font-[700] text-lg">
                    Special Events
                  </p>
                  <Link to="/events-calendar">
                    <img
                      src="/Down 2.svg"
                      className="hover:bg-slate-200 rounded-full transition-all duration-300 ease-in -rotate-90 cursor-pointer"
                      alt="View more"
                    />
                  </Link>
                </div>

                {/* Events List */}
                <div className="flex flex-col space-y-5">
                  {eventList.map((event, index) => (
                    <EventList
                      key={index}
                      {...event}
                      className={`${
                        eventList.length - 1 === index ? "border-b-0" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg space-y-2">
                <div className="flex items-center justify-between pb-4">
                  <p className="text-[#706D8A] font-[700] text-lg">Announcements</p>
                </div>
                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
                  {announcements.map((announcement, index) => (
                    <AnnouncementCard {...announcement} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Manage Employees Table Section */}
          <div className="flex flex-grow w-full h-full">
            <EventsCalendar events={events} announcements={hrannouncements} />
          </div>
        </section>
      </div>

      {/* Modal for a new Event request */}
      {isModalOpen && (
        <SideFormModal
          initialFormValues={getInitialValues(selectedFormType)}
          validationSchema={getValidationSchema(selectedFormType)}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          title="New Event"
          back={true}
          backFn={() => setIsModalOpen(false)}
          formClassName="flex flex-col my-8 gap-6  "
        >
          {({ values, errors, touched, setFieldValue }) => (
            <>
              <div className="mb-6">
                <label htmlFor="formType" className="block mb-2 font-medium text-gray-700">
                  Event Type
                </label>
                <Field name="formType">
                  {({ field, form, meta }: FieldProps) => (
                    <div className="relative">
                      <Select
                        onValueChange={(value) => {
                          setSelectedFormType(value);
                          form.setFieldValue(field.name, value);
                        }}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full bg-gray-100 py-6 rounded-b-none focus-visible:ring-1 focus-visible:ring-rgtpurpleaccent3 ">
                          <SelectValue placeholder="Select Event Type" />
                        </SelectTrigger>
                        <SelectContent
                          position="popper"
                          className="z-[2000]"
                        >
                          <SelectGroup className="">
                            <SelectLabel>Select an event type</SelectLabel>
                            {formTypes.map((item) => (
                              <SelectItem className="py-[12px] px-[24px] focus:bg-rgtpurpleaccent3" value={item.id} key={item.id}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {meta.touched && meta.error && (
                        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>

                <div className=" mt-6 overflow-y-auto max-h-[500px]">
                  {renderFormFields(values.formType)}
                </div>
              </div>
            </>
          )}
        </SideFormModal>
      )}
    </>
  );
};

export default Events;