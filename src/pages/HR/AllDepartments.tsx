import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {useState} from "react"
import {SideFormModal} from "@/components/Modal";
import { Field, Form as FormikForm, Formik, FieldInputProps, FormikHelpers, FieldProps } from 'formik';
import * as Yup from 'yup';
import { Textarea } from "@/components/ui/textarea";
import {Mail,FileText} from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import {useAllEmployees} from "@/api/query-hooks/employee.hooks"
  import {useCreateDepartment} from "@/api/query-hooks/department.hooks"
import {useSelector} from "react-redux"
import {RootState} from "@/state/store"
import ProjectCard from "@/components/ProjectCard";

const NewDepSchema = Yup.object({
    name: Yup.string().min(3, "A minimum of 3 characters are required for your department name")
    .max(100, "A max of 100 characters are required for you rdepartment name").required('Required'),
    description: Yup.string().min(10, "A minimum of 10 characters are required for your department description")
    .max(200, "A max of 100 characters are required for you rdepartment name").required('Required'),
    managerId: Yup.string().required('Required'),
})

interface FormValues {
    name: string;
    description: string;
    managerId: string;
}
  

export const AllDepartments = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {departments} = useSelector((state: RootState) => state.sharedState);
    const createDepartmentMutation = useCreateDepartment();


    const { 
        data: users, 
        isLoading,
        isError,
      } = useAllEmployees(
        {},
        {
            // Only enable when modal is open
            enabled: isModalOpen
        }
      );

    const handleFormSubmit = (values: typeof initialFormValues, helpers: FormikHelpers<typeof initialFormValues>) => {
        console.log("Submmitting Form", values);
        createDepartmentMutation.mutate({ 
            data: {
                name: values.name,
                description: values.description,
                managerId: Number( values.managerId)
            } 
        });
        helpers.resetForm();
        setIsModalOpen(false);
    };

    const initialFormValues:FormValues = {
        name: '',
        description: '',
        managerId: '',
    };
    



    return (
        <>
        <div className="flex flex-col gap-[15px] pt-[10px] h-full ">
            <section className="h-[62px] flex justify-between w-full items-center py-1">

                {/* Title and subtitle */}
                <div className="flex flex-col h-full">
                    <h1 className="text-xl font-medium text-gray-600">All Departments</h1>
                    <p className="text-sm text-gray-500">These are all current Departments</p>
                </div>

                <div className="md:flex md:flex-row gap-4 items-center h-full flex-col">
                    <div className="relative justify-between items-center sm:w-[100px] md:w-[301px] md:max-w-[301px] flex-grow">
                        <Input
                            type="text"
                            placeholder="Search For A Department"
                            className="pl-5 py-5 rounded-xl bg-gray-50 border-none outline-none shadow-none h-full"
                        />
                        <Search className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
                    </div>

                    <Button onClick={() => setIsModalOpen(true)} className="bg-rgtviolet hover:bg-violet-900 rounded-xl h-full">
                        Create a New Department
                    </Button>
                </div>
            </section>

            {departments && departments.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {departments.map(department => (
                  <ProjectCard id={department.id} path="/hr/dashboard" name={department.name} members={department.employees?? []} />
                ))}
              </div>
            ):(
                //  No Departments Section 
                <div className="flex flex-col items-center justify-center h-full  ">
                    <div className="flex items-center justify-center w-16 h-16 rounded-lg  mb-4">
                        <img src="/FolderAdd.svg" />
                    </div>
                    
                    <h2 className="text-gray-600 text-lg font-medium mb-1">
                        No Departments at the moment
                    </h2>
                    
                    <p className="text-gray-400 text-sm">
                        Click create a new department
                    </p>
                </div>
            )}




        </div>
        {/* modal for a new Time off request */}
        {isModalOpen && (
        <SideFormModal
          initialFormValues={initialFormValues}
          validationSchema = {NewDepSchema}
          onSubmit={handleFormSubmit}
          title="Add New Department"
          back = {true}
          backFn = {() => setIsModalOpen(false)}
          formClassName="flex flex-col my-8 gap-6"
          submitBtnText = {createDepartmentMutation.isPending ? "Loading..." : "Create"}
          isSubmitting= {createDepartmentMutation.isPending}
          isSubmittingClassName= {"bg-pink-200"}
        //   cancelbuttonClassName="px-6 py-4 w-1/2 cursor-pointer text-white font-medium bg-rgtpink rounded-md hover:bg-pink-500"
        >
            <Field name="name">
                {({ field, form: { touched, errors } }: { field: FieldInputProps<string>; form: any }) => (
                <div className="">
                    <div className="relative">
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter your department name"
                        {...field}
                        className={`w-full py-6 px-4 ${touched.name && errors.name ? "border-red-500" : ""}`}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    </div>
                    {touched.name && errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                </div>
                )}
            </Field>

            <Field name="description">
                {({ field, form: { touched, errors } }: { field: FieldInputProps<string>; form: any }) => (
                <div className="gap-3">
                    <div className="relative">
                        <Textarea
                            id="description"
                            placeholder="Enter department description"
                            {...field}
                            className={`w-full min-h-[100px] px-4 py-2 ${touched.description && errors.description ? "border-red-500" : ""}`}
                        />
                        <div className="absolute right-3 top-2 transform">
                            <FileText className="h-5 w-5 text-gray-500" />
                        </div>
                    </div>
                    {touched.description && errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                </div>
                )}
            </Field>

            <Field name="managerId">
            {({ field, form, meta }: FieldProps) => (
                <div className="relative" > 
                    <Select
                        onValueChange={(value) => form.setFieldValue(field.name, value)}
                        defaultValue={field.value}
                    >
                        <SelectTrigger className="w-full py-6">
                        <SelectValue placeholder="Select A Manager For The Department" />
                        </SelectTrigger>
                        <SelectContent 
                            position="popper" 
                            // sideOffset={5}
                            // align="start"
                            className="z-[2000]"  // Higher z-index than the modal
                        >
                        <SelectGroup>
                            <SelectLabel>Select a manager for this department</SelectLabel>
                            {users && users.length > 0 ? (
                                users.map((item) => (
                                    <SelectItem value={item.id.toString()} key={item.id}>
                                    {item.firstName}
                                    </SelectItem>
                                ))
                            ) : (
                            <SelectItem value="no-managers" disabled>No managers available</SelectItem>
                            )}
                        </SelectGroup>
                        </SelectContent>
                    </Select>
                    {meta.touched && meta.error && (
                        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
                    )}
                </div>
            )}
            </Field>
        </SideFormModal>
      )}
        </>

    )
}