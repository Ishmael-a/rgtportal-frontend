import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Column, DataTableProps } from "@/types/tables";

export function DataTable({
  columns,
  data,
  dividers = false,
  actionBool = true,
  actionObj = [],
}: DataTableProps) {
  const tableColumns: Column[] = actionBool
    ? [
        ...columns,
        {
          key: "actions",
          header: "Actions",
          render: () => (
            <div className="space-x-1">
              {actionObj.map((action) => {
                switch (action.name) {
                  case "view":
                    return (
                      <button
                        key="view"
                        className="bg-[#FFA6CD] text-white p-1 rounded-md hover:bg-pink-400 duration-300 ease-in transition-colors cursor-pointer"
                        onClick={() => action.action()}
                      >
                        <img src="/Show.svg" alt="view" />
                      </button>
                    );
                  case "edit":
                    return (
                      <button
                        key="edit"
                        className="bg-[#C0AFFF] text-white p-1 rounded-md hover:bg-purple-300 duration-300 ease-in transition-colors cursor-pointer"
                        onClick={() => action.action()}
                      >
                        <img src="/Edit 2.svg" alt="edit" />
                      </button>
                    );
                  case "delete":
                    return (
                      <button
                        key="delete"
                        className="bg-[#EB2E31] text-white p-1 rounded-md hover:bg-red-500 duration-300 ease-in cursor-pointer transition-colors"
                        onClick={() => action.action()}
                      >
                        <img src="/Delete.svg" alt="delete" />
                      </button>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          ),
        },
      ]
    : columns;

  return (
    <div className="max-w-72 sm:max-w-[500px] flex flex-col md:max-w-full">
      <Table
        className={
          dividers ? "" : "border-none bg-white rounded-md min-h-60 space-y-6  "
        }
      >
        <TableHeader>
          <TableRow className={`border-none`}>
            {tableColumns.map((column) => (
              <TableHead
                key={column.key}
                className={"border-none text-[#A3A7AA] text-xs p-6 text-left"}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={` ${dividers ? "" : " border-none"}`}
            >
              {tableColumns.map((column) => (
                <TableCell
                  key={column.key}
                  className={`${
                    dividers
                      ? ""
                      : "border-none text-xs font-semibold text-[#898989] text-nowrap"
                  }
                  `}
                >
                  <div
                    className={`  w-fit ${
                      typeof column.cellClassName === "function"
                        ? column.cellClassName(row) // Call the function with row data
                        : column.cellClassName ?? ""
                    } ${column.render ? "flex gap-2 px-4 py-4 space-x-4" : "p-2 px-4 text-center"} `}
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className="flex w-full mx-auto mt-3"> */}
        {/* <StepProgress /> */}
      {/* </div> */}
    </div>
  );
}
