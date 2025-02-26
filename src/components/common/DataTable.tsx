/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column } from "@/pages/Employee/TimeOff";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface DataTableProps {
  columns: Column[];
  data: Record<string, any>[];
  dividers?: boolean;
}

export function DataTable({ columns, data, dividers = true }: DataTableProps) {
  console.log("column:", columns);
  return (
    <div className="max-w-72 sm:max-w-[500px] flex md:max-w-full">
      <Table
        className={
          dividers ? "" : "border-none bg-white rounded-md min-h-52 space-y-2  "
        }
      >
        <TableHeader>
          <TableRow className={`border-none`}>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={"border-none text-[#A3A7AA] text-xs p-5"}
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
              className={` ${dividers ? "" : "border-none"}`}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  className={`${
                    dividers
                      ? ""
                      : "border-none   text-xs font-semibold text-[#898989] text-nowrap"
                  }
                  `}
                >
                  <div
                    className={`  w-fit ${
                      typeof column.cellClassName === "function"
                        ? column.cellClassName(row) // Call the function with row data
                        : column.cellClassName ?? ""
                    } ${column.render ? "flex gap-2 p-0 space-x-4" : "p-2"} `}
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ${
//                 typeof column.cellClassName === "function"
//                   ? column.cellClassName(row) // Call the function with row data
//                   : column.cellClassName ?? ""
//               }
