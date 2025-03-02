import { ClassNameValue } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import { Field, Form as FormikForm, Formik, FieldInputProps, FormikHelpers, FormikValues } from 'formik';
import * as Yup from "yup"; // Ensure Yup is imported for validation



interface ISideFormModal<T extends FormikValues> {
  title: string;
  validationSchema: Yup.ObjectSchema<T>;
  initialFormValues: T;
  buttonClassName?: ClassNameValue;
  children: React.ReactNode;
  onSubmit?: (values: T, formikHelpers: FormikHelpers<T>) => void;
  back: boolean;
  backFn: () => void;
}

export const SideFormModal = <T extends FormikValues>({
  title,
  children,
  initialFormValues,
  validationSchema,
  buttonClassName,
  onSubmit,
  back ,
  backFn,
}: ISideFormModal<T>) => {
  return (
    <div
      className="fixed inset-0  backdrop-blur-xs  flex items-start justify-end"
      style={{ zIndex: 170 }}
    >
      {back && (
        <div className="relative h-screen flex flex-col justify-center p-5">
          <img
            src="/Down 2.svg"
            className="-rotate-90 bg-white p-2 rounded-full shadow-neutral-400 shadow-lg top-10 border hover:bg-slate-100 transition-all duration-300 ease-in cursor-pointer"
            onClick={backFn}
          />
        </div>
      )}
      <div className="bg-white shadow-lg  max-w-md w-full p-6 h-screen flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-[#706D8A]">{title}</h2>

        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={(values, helpers) => {
            if (onSubmit) onSubmit(values as T, helpers as FormikHelpers<T>);
          }}
        >

          <FormikForm
            className="flex flex-col justify-start h-full"
          >
            {/* Form fields container */}
            <div className="flex-grow">{children}</div>

            {/* Buttons */}
            <div className="flex w-full mt-auto h-14 gap-[20px]">
              {/* Cancel Button */}
              <Button onClick={backFn} key={"Cancel"} variant="outline" className="w-1/2 h-full rounded-[12px] border-red-500 text-red-500 hover:bg-red-100">
                Cancel
              </Button>

              {/* Create Button */}
              <Button  key={"Create"} className="w-1/2 h-full rounded-[12px] bg-rgtpink hover:bg-pink-600 text-white">
                Create
              </Button>

            </div>
          </FormikForm>

        </Formik>
      </div>
    </div>
  );
};

// export default TimeOffModal;
