/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/common/DataTable";
import DatePicker from "@/components/common/DatePicker";
import CustomSelect from "@/components/common/Select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface Column {
  key: string;
  header: string;
  cellClassName?: (row: Record<string, any>) => string | string;
  render?: (row: Record<string, any>) => React.ReactNode;
}

const handleEdit = (row: Record<string, any>) => {
  console.log("Editing row:", row);
  // Add your edit logic here
};

const columns: Column[] = [
  { key: "from", header: "From" },
  { key: "to", header: "To" },
  { key: "total", header: "Total" },
  { key: "reason", header: "Reason" },
  {
    key: "status",
    header: "Status",
    cellClassName: (row: Record<string, any>) => {
      const status = row.status; // Access the status value from the row
      return `${
        status === "Pending"
          ? "font-semibold text-[#F9B500] bg-[#FFF7D8] rounded-md w-fit text-left"
          : status === "Approved"
          ? "font-semibold text-[#7ABB9E] bg-[#E5F6EF] rounded-md w-fit"
          : status === "Rejected"
          ? "font-semibold text-[#D92D20] bg-[#FEE4E2] rounded-md "
          : ""
      }`;
    },
  },
  {
    key: "type",
    header: "Type",
    cellClassName: (row: Record<string, any>) => {
      const type = row.type; // Access the type value from the row
      return `${
        type === "Sick Leave"
          ? "font-semibold text-[#7ABB9E]  bg-[#E5F6EF] rounded-md w-fit"
          : type === "PTO"
          ? "font-semibold text-[#F9B500]   bg-[#FFF7D8] rounded-md w-fit"
          : ""
      }`;
    },
  },
  {
    key: "action",
    header: "Action",
    // cellClassName: () => "text-red-600 flex-1", // Static class name
    render: (row) => (
      <div className="space-x-1">
        <button
          className="bg-[#FFA6CD] text-white p-1 rounded-md hover:bg-pink-400 duration-300 ease-in transition-colors cursor-pointer"
          onClick={() => handleEdit(row)}
        >
          <img src="Show.svg" />
        </button>

        <button className="bg-[#EB2E31] text-white p-1 rounded-md hover:bg-red-500 duration-300 ease-in cursor-pointer transition-colors">
          <img src="Delete.svg" />
        </button>
      </div>
    ),
  },
];
const data = [
  {
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    reason: "Engagement",
    status: "Pending",
    type: "Sick Leave",
    // action: "Edit",
  },
  {
    from: "01 Mar 2023",
    to: "02 Mar 2023",
    total: "1 Day",
    reason: "Unwell",
    status: "Approved",
    type: "PTO",
    // action: "Edit",
  },
  {
    from: "01 Mar 2023",
    to: "04 Mar 2023",
    total: "4 Days",
    reason: "Emergency",
    status: "Rejected",
    type: "PTO",
    // action: "Edit",
  },
];

export default function TimeOff() {
  const [showRequest, setShowRequest] = useState(false)
  return (
    <div className="p-4">
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-semibold mb-4 text-[#706D8A] ">
          Request Time List
        </h1>
        <Button className="bg-rgtpink hover:bg-pink-500 cursor-pointer text-white font-medium text-sm py-6 transition-colors duration-300 ease-in">
          <img src="Add.svg" alt="add" />
          Add New Request
        </Button>
      </header>

      <div className="flex gap-3 h-[50px] items-center my-8">
        <DatePicker />
        <CustomSelect data={["plnt"]} />
        <CustomSelect data={["plnt"]} />
      </div>

      {/* Table with custom cell styles */}
      <DataTable columns={columns} data={data} dividers={false} />
    </div>
  );
}
