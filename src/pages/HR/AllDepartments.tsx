import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {useState} from "react"
import {SideFormModal} from "@/components/Modal";
import DatePicker from "@/components/common/DatePicker";
import { Field, Form as FormikForm, Formik, FieldInputProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {Mail} from "lucide-react"

const NewDepSchema = Yup.object({
    name: Yup.string().min(3, "A minimum of 3 characters are required for you rdepartment name")
    .max(100, "A max of 100 characters are required for you rdepartment name").required('Required'),
})

interface FormValues {
    name: string;
}
  

export const AllDepartments = () => {
    const [fromDate, setFromDate] = useState<Date>();
    const [toDate, setToDate] = useState<Date>();
    const [isSuccess, setIsSuccess] = useState(false);
    

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [timeOffType, setTimeOffType] = useState("PTO");
    const [reason, setReason] = useState("");

    const handleFromDate = (val: Date | undefined) => {
        setFromDate(val);
    };
    
    const handleToDate = (val: Date | undefined) => {
        setToDate(val);
    };

    const handleFormSubmit = (values: typeof initialFormValues, helpers: FormikHelpers<typeof initialFormValues>) => {
        setIsModalOpen(false);
        console.log("Submmitting Form", values);
    };

    const initialFormValues = {
        name: '',
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


            {/* No Departments Section */}
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
                        className={`w-full py-2 px-4 ${touched.name && errors.name ? "border-red-500" : ""}`}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    </div>
                    {touched.name && errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                </div>
                )}
            </Field>
        </SideFormModal>
      )}
        </>

    )
}