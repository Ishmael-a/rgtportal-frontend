import { DataTable } from "@/components/common/DataTable";
import DatePicker from "@/components/common/DatePicker";
import CustomSelect from "@/components/common/Select";
import SuccessCard from "@/components/common/SuccessCard";
import { SideFormModal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { timeOffDummy, timeOffTableColumns } from "@/constants";
import { useState } from "react";
import * as Yup from "yup";

export default function TimeOff() {
  const [appRej, setAppRej] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  const [ptoForm, setPtoForm] = useState({
    timeOffType: "PTO",
    reason: "",
    fromDate: new Date(),
    toDate: new Date(),
  });

  const ptoFormSchema = Yup.object({
    timeOffType: Yup.string().required("Required"),
    reason: Yup.string()
      .min(3, "A minimum of 3 characters are required for you rdepartment name")
      .max(100, "A max of 100 characters are required for you rdepartment name")
      .required("Required"),
    fromDate: Yup.date().required("Required"),
    toDate: Yup.date().required("Required"),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPtoForm((prev) =>
      prev
        ? {
            ...prev,
            [name]: value,
          }
        : prev
    );
    console.log("formChanging:", ptoForm);
  };

  console.log("From:", fromDate);
  console.log("To:", toDate);

  const handleFromDate = (val: Date | undefined) => {
    setFromDate(val);
  };

  const handleToDate = (val: Date | undefined) => {
    setToDate(val);
  };

  // const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("submitting", e);
  //   setIsModalOpen(false);
  // };

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

        <div className="flex gap-3 h-[50px] items-center my-8">
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
            { name: "view", action: () => setAppRej(true) },
            { name: "delete", action: () => console.log("delete") },
          ]}
        />
      </div>

      {/* modal for a new Time off request */}
      {isModalOpen && (
        // <div>TimeOff</div>
        <SideFormModal
          // onSubmit={handleFormSubmit}
          title="Add New Time Off"
          back
          validationSchema={ptoFormSchema}
          initialFormValues={ptoForm}
          buttonClassName="px-6 py-4 w-1/2 cursor-pointer text-white font-medium bg-rgtpink rounded-md hover:bg-pink-500"
        >
          <section className="space-y-[25px] h-[85%]">
            {/* Time Off Type */}
            <div className="">
              <label className="block pb-[10px] text-xs font-semibold text-[#7D7D81]">
                Time Off Type
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  // onClick={(e) => setPtoForm()}
                  className={`px-3 py-1 rounded-md text-[11px] font-medium border-[1px] duration-300 transition-colors ease-in cursor-pointer 
                    `}
                  //   ${
                  //   timeOffType === "PTO"
                  //     ? "bg-gray-200"
                  //     : "bg-[#F6F6F9] text-gray-700 hover:bg-gray-200"
                  // }
                >
                  PTO
                </button>
                <button
                  type="button"
                  // onClick={() => setTimeOffType("Sick Leave")}
                  className={`px-4 py-2 rounded-md border text-[11px] font-medium duration-300 transition-colors ease-in cursor-pointer
                    `}
                  //   ${
                  //   timeOffType === "Sick Leave"
                  //     ? "bg-gray-200"
                  //     : "bg-[#F6F6F9] text-gray-700 hover:bg-gray-200"
                  // }
                >
                  Sick Leave
                </button>
              </div>
            </div>

            {/* From and To Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium text-xs text-[#737276]">
                  From
                </label>
                <DatePicker placeholder="From" fn={handleFromDate} />
              </div>
              <div>
                <label className="font-medium text-xs text-[#737276]">To</label>
                <DatePicker placeholder="To" fn={handleToDate} />
              </div>
            </div>

            {/* Reason */}
            <div className="pt-5">
              <label className="block text-xs font-medium  text-[#737276]">
                Reason
              </label>
              <textarea
                name="reason"
                value={ptoForm.reason}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md resize-none bg-[#F6F6F9]"
                rows={3}
                placeholder="Provide your reason"
                maxLength={50}
              />
            </div>
          </section>
        </SideFormModal>
      )}

      {/* modal for viewing old request */}
      {appRej && (
        <div>TimeOff</div>
        // <SideFormModal
        //   title="Approve or Reject Request"
        //   back={true}
        //   backFn={() => setAppRej(false)}
        // >
        //   <div className="flex flex-col gap-1">
        //     <label className="text-[#73727675] font-semibold text-sm">
        //       Employee Name
        //     </label>
        //     <Input
        //       value={"Enchill Beckham"}
        //       className="shadow-none border-0 py-[22px] rounded-md bg-[#F6F6F9] text-base text-[#73727675] font-semibold"
        //       disabled
        //     />
        //   </div>

        //   <section className="flex gap-2">
        //     <div>
        //       <label className="text-[#73727675] font-semibold text-sm">
        //         From
        //       </label>
        //       <Input
        //         value={"01 March 2023"}
        //         className="shadow-none border-0 py-[22px] rounded-md bg-[#F6F6F9] text-[#73727675] font-medium text-base"
        //         disabled
        //       />
        //     </div>

        //     <div>
        //       <label className="text-[#73727675] font-semibold text-sm">
        //         To
        //       </label>
        //       <Input
        //         value={"01 March 2024"}
        //         className="shadow-none border-0 py-[22px] rounded-md bg-[#F6F6F9] text-[#73727675] font-medium text-base"
        //         disabled
        //       />
        //     </div>
        //   </section>
        //   <section className="space-y-5 pt-3">
        //     <div className="flex flex-col gap-1">
        //       <label className="text-[#73727675] font-semibold text-sm">
        //         Reason
        //       </label>
        //       <textarea
        //         className="resize-none bg-[#F6F6F9] p-2 text-[#73727675] font-medium text-base rounded-md"
        //         value={"Engagement"}
        //         disabled
        //       />
        //     </div>

        //     <div className="flex flex-col gap-1">
        //       <label className="text-[#73727675] font-semibold text-sm">
        //         HR Reason
        //       </label>
        //       <textarea
        //         className="resize-none bg-[#F6F6F9] p-2 text-[#73727675] font-medium text-base rounded-md"
        //         value={"We can't let you go at the moment"}
        //         disabled
        //       />
        //     </div>
        //   </section>
        // </SideFormModal>
      )}

      {/* Success modal for timeoff creation */}
      {isSuccess && <SuccessCard handleClick={handleCheckNow} />}
    </main>
  );
}
