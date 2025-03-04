/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/common/DataTable";
import DatePicker from "@/components/common/DatePicker";
import CustomSelect from "@/components/common/Select";
import SuccessCard from "@/components/common/SuccessCard";
import { SideFormModal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { timeOffDummy, timeOffTableColumns } from "@/constants";
import { Field, FieldInputProps, FormikHelpers } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function TimeOff() {
  const [appRej, setAppRej] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialFormValues = {
    leaveType: "pto",
    reason: "",
    fromDate: undefined,
    toDate: undefined,
  };

  const ptoFormSchema = Yup.object({
    leaveType: Yup.string()
      .oneOf(["pto", "sickLeave"], "Invalid leave type")
      .required("Leave type is required"),
    reason: Yup.string()
      .max(50, "Reason must be at most 50 characters")
      .required("Reason is required"),
    fromDate: Yup.date()
      .required("From date is required")
      .typeError("Invalid date"),
    toDate: Yup.date()
      .required("To date is required")
      .min(Yup.ref("fromDate"), "To date must be after From date")
      .typeError("Invalid date"),
  });

  const handleFormSubmit = (
    values: typeof initialFormValues,
    { setSubmitting }: FormikHelpers<typeof initialFormValues>
  ) => {
    console.log("Submmitting Form", values);
    setSubmitting(false);
    setIsModalOpen(false);
    setIsSuccess(true);
  };

  const handleCheckNow = () => {
    console.log("...checking");
    setIsSuccess(false);
  };

  return (
    <main>
      <div className="bg-white p-4 rounded-md">
        <header className="flex justify-between items-center">
          <h1 className="text-xl font-semibold mb-4 text-[#706D8A] ">
            Request Time List
          </h1>
          <Button
            className="bg-rgtpink hover:bg-pink-500 cursor-pointer text-white font-medium text-sm py-6 transition-colors duration-300 ease-in"
            onClick={() => setIsModalOpen(true)}
          >
            <img src="/Add.svg" alt="add" />
            Add New Request
          </Button>
        </header>

        <div className="grid grid-cols-3 gap-3 h-[50px] my-8">
          <DatePicker />
          <CustomSelect options={["plnt"]} />
          <CustomSelect options={["plnt"]} />
        </div>

        {/* Table with custom cell styles */}
        <DataTable
          columns={timeOffTableColumns}
          data={timeOffDummy}
          actionBool={true}
          actionObj={[
            { name: "view", action: () => setAppRej(!appRej) },
            { name: "delete", action: () => console.log("delete") },
          ]}
        />
      </div>

      {/* modal for a new Time off request */}
      {isModalOpen && (
        <SideFormModal
          onSubmit={handleFormSubmit}
          title="Add New Time Off"
          validationSchema={ptoFormSchema}
          initialFormValues={initialFormValues}
          backFn={() => setIsModalOpen(false)}
          back={true}
          submitBtnText="Create"
          buttonClassName="px-6 py-4 w-1/2 cursor-pointer text-white font-medium bg-rgtpink rounded-md hover:bg-pink-500"
        >
          <Field name="leaveType">
            {({
              field,
              form: { touched, errors },
            }: {
              field: FieldInputProps<string>;
              form: any;
            }) => (
              <div className="pb-1">
                <label className="block text-xs font-medium pb-1 text-[#737276]">
                  Leave Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center text-[#737276] text-xs font-medium">
                    <input
                      type="radio"
                      {...field}
                      value="pto"
                      checked={field.value === "pto"}
                      className="mr-2"
                    />
                    PTO
                  </label>
                  <label className="flex items-center text-[#737276] text-xs font-medium">
                    <input
                      type="radio"
                      {...field}
                      value="sickLeave"
                      checked={field.value === "sickLeave"}
                      className="mr-2"
                    />
                    Sick Leave
                  </label>
                </div>
                {touched.leaveType && errors.leaveType && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.leaveType}
                  </div>
                )}
              </div>
            )}
          </Field>

          <div className="flex w-full gap-4 pt-2">
            <Field name="fromDate">
              {({
                field,
                form: { setFieldValue, touched, errors },
              }: {
                field: FieldInputProps<Date>;
                form: any;
              }) => (
                <div className="flex flex-col w-full">
                  <label className="font-medium text-xs text-[#737276]">
                    From
                  </label>
                  <DatePicker
                    placeholder="From"
                    value={field.value}
                    onChange={(val) => setFieldValue("fromDate", val)}
                  />
                  {touched.fromDate && errors.fromDate && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.fromDate}
                    </div>
                  )}
                </div>
              )}
            </Field>

            <Field name="toDate">
              {({
                field,
                form: { setFieldValue, touched, errors },
              }: {
                field: FieldInputProps<Date>;
                form: any;
              }) => (
                <div className="flex flex-col w-full">
                  <label className="font-medium text-xs text-[#737276]">
                    To
                  </label>
                  <DatePicker
                    placeholder="To"
                    value={field.value}
                    onChange={(val) => setFieldValue("toDate", val)}
                  />
                  {touched.toDate && errors.toDate && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.toDate}
                    </div>
                  )}
                </div>
              )}
            </Field>
          </div>

          <Field name="reason">
            {({
              field,
              form: { touched, errors },
            }: {
              field: FieldInputProps<string>;
              form: any;
            }) => (
              <div className="pt-5">
                <label className="block text-xs font-medium pb-1 text-[#737276]">
                  Reason
                </label>
                <textarea
                  {...field}
                  className={`w-full px-3 py-2 border rounded-md resize-none bg-[#F6F6F9] ${touched.reason && errors.reason ? "border-red-500" : ""}`}
                  rows={3}
                  placeholder="Provide your reason"
                  maxLength={50}
                />
                {touched.reason && errors.reason && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.reason}
                  </div>
                )}
              </div>
            )}
          </Field>
        </SideFormModal>
      )}

      {/* modal for viewing old request */}
      {appRej && (
        <SideFormModal
          title="Approve or Reject Request"
          back={true}
          backFn={() => setAppRej(false)}
        >
          <section className="flex gap-2">
            <div>
              <label className="text-[#73727675] font-semibold text-sm">
                From
              </label>
              <Input
                value={"01 March 2023"}
                className="shadow-none border-0 py-[22px] rounded-md bg-[#F6F6F9] text-[#73727675] font-medium text-base"
                disabled
              />
            </div>

            <div>
              <label className="text-[#73727675] font-semibold text-sm">
                To
              </label>
              <Input
                value={"01 March 2024"}
                className="shadow-none border-0 py-[22px] rounded-md bg-[#F6F6F9] text-[#73727675] font-medium text-base"
                disabled
              />
            </div>
          </section>
          <section className="space-y-5 pt-3">
            <div className="flex flex-col gap-1">
              <label className="text-[#73727675] font-semibold text-sm">
                Reason
              </label>
              <textarea
                className="resize-none bg-[#F6F6F9] p-2 text-[#73727675] font-medium text-base rounded-md"
                value={"Engagement"}
                disabled
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#73727675] font-semibold text-sm">
                HR Reason
              </label>
              <textarea
                className="resize-none bg-[#F6F6F9] p-2 text-[#73727675] font-medium text-base rounded-md"
                value={"We can't let you go at the moment"}
                disabled
              />
            </div>
          </section>
        </SideFormModal>
      )}

      {/* Success modal for timeoff creation */}
      {isSuccess && <SuccessCard handleClick={handleCheckNow} />}
    </main>
  );
}
