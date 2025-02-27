import { DataTable } from "@/components/common/DataTable";
import DatePicker from "@/components/common/DatePicker";
import CustomSelect from "@/components/common/Select";
import TimeOffModal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { timeOffDummy, timeOffTableColumns } from "@/constants";
import React, { useState } from "react";

export default function TimeOff() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appRej, setAppRej] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [timeOffType, setTimeOffType] = useState("PTO");
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [reason, setReason] = useState("");

  console.log("Time Off Type:", timeOffType);
  console.log("From:", fromDate);
  console.log("To:", toDate);
  console.log("Reason:", reason);

  const handleFromDate = (val: Date | undefined) => {
    setFromDate(val);
  };

  const handleToDate = (val: Date | undefined) => {
    setToDate(val);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting", e);
    setIsModalOpen(false);
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
        <TimeOffModal
          onSubmit={handleFormSubmit}
          title="Add New Time Off"
          buttons={[
            { name: "Cancel", fn: () => setIsModalOpen(false) },
            { name: "Create", fn: () => setIsSuccess(true) },
          ]}
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
                  onClick={() => setTimeOffType("PTO")}
                  className={`px-3 py-1 rounded-md text-[11px] font-medium border-[1px] duration-300 transition-colors ease-in cursor-pointer ${
                    timeOffType === "PTO"
                      ? "bg-gray-200"
                      : "bg-[#F6F6F9] text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  PTO
                </button>
                <button
                  type="button"
                  onClick={() => setTimeOffType("Sick Leave")}
                  className={`px-4 py-2 rounded-md border text-[11px] font-medium duration-300 transition-colors ease-in cursor-pointer ${
                    timeOffType === "Sick Leave"
                      ? "bg-gray-200"
                      : "bg-[#F6F6F9] text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Sick Leave
                </button>
              </div>
            </div>

            {/* From and To Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <DatePicker placeholder="From" fn={handleFromDate} />
              </div>
              <div>
                <DatePicker placeholder="To" fn={handleToDate} />
              </div>
            </div>

            {/* Reason */}
            <div className="mb-6">
              <label className="block text-sm font-medium pb-2 text-[#737276]">
                Reason
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 border rounded-md resize-none bg-[#F6F6F9]"
                rows={3}
                placeholder="Provide your reason"
                // required
                maxLength={50}
              />
            </div>
          </section>
        </TimeOffModal>
      )}

      {/* modal for viewing old request */}
      {appRej && (
        <TimeOffModal
          title="Approve or Reject Request"
          back={true}
          backFn={() => setAppRej(false)}
        >
          <div className="flex flex-col gap-1">
            <label className="text-[#73727675] font-semibold text-sm">
              Employee Name
            </label>
            <Input
              value={"Enchill Beckham"}
              className="shadow-none border-0 py-[22px] rounded-md bg-[#F6F6F9] text-base text-[#73727675] font-semibold"
              disabled
            />
          </div>

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
        </TimeOffModal>
      )}

      {/* Success modal for timeoff creation */}
      {isSuccess && (
        <section
          className="fixed inset-0  backdrop-blur-xs  flex items-center justify-center"
          style={{ zIndex: 100 }}
        >
          <div className="bg-white flex flex-col items- justify-cente border p-5 min-w-md rounded-lg space-y-6">
            <div className="flex items-center flex-col space-y-2">
              <img src="/successIcon.svg" />
              <p className="font-semibold text-[#181D27] text-lg">Success!</p>
              <p className="text-[#535862] text-sm">
                You have successfully made a request!
              </p>
            </div>
            <Button
              className="bg-[#FFA6CD] text-rgtpink hover:bg-pink-400 transition-colors duration-300 ease-in hover:text-white cursor-pointer"
              onClick={handleCheckNow}
            >
              Check now
            </Button>
          </div>
        </section>
      )}
    </main>
  );
}
