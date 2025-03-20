/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Column, DataTableProps } from "@/types/tables";
import DeleteCard from "./DeleteCard";
import { useState } from "react";
import DataTableSkeleton from "@/pages/Employee/components/DataTableSkeleton";

export function DataTable({
  columns,
  data,
  dividers = false,
  actionBool = true,
  actionObj = [],
  showDelete,
  setShowDelete,
  onDelete,
  isDeleteLoading,
  loading,
}: DataTableProps) {
  const [cellToDelete, setCellToDelete] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (setShowDelete && onDelete) {
      await onDelete(id);
      setCellToDelete(null);
      setShowDelete(false);
    }
  };

  const tableColumns: Column[] = actionBool
    ? [
        ...columns,
        {
          key: "actions",
          header: "Actions",
          render: (row) => (
            <div className="space-x-1">
              {actionObj.map((action) => {
                switch (action.name) {
                  case "view":
                    return (
                      <button
                        key="view"
                        className="bg-[#FFA6CD] text-white p-1 rounded-md hover:bg-pink-400 duration-300 ease-in transition-colors cursor-pointer"
                        onClick={() => action.action(row.id)}
                      >
                        <img src="/Show.svg" />
                      </button>
                    );
                  case "edit":
                    return (
                      <button
                        key="edit"
                        className="bg-[#C0AFFF] text-white p-1 rounded-md hover:bg-purple-300 duration-300 ease-in transition-colors cursor-pointer"
                        onClick={() => action.action(row.id, row)}
                      >
                        <img src="/Edit 2.svg" alt="edit" />
                      </button>
                    );
                  case "delete":
                    return (
                      <>
                        <button
                          key="delete"
                          className="bg-[#EB2E31] text-white p-1 rounded-md hover:bg-red-500 duration-300 ease-in cursor-pointer transition-colors"
                          onClick={() => {
                            setCellToDelete(row.id);
                            if (setShowDelete) {
                              setShowDelete(true);
                            }
                          }}
                        >
                          <img src="/Delete.svg" alt="delete" />
                        </button>
                      </>
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
    <div className=" sm:max-w-full flex flex-col ">
      {loading ? (
        <DataTableSkeleton columns={columns} actionBool={actionBool} />
      ) : (
        <Table
          className={
            dividers
              ? ""
              : "border-none bg-white rounded-md min-h-60 space-y-6  "
          }
        >
          <TableHeader>
            <TableRow className={`border-none`}>
              {tableColumns.map((column) => (
                <TableHead
                  key={column.key}
                  className={
                    "border-none text-nowrap text-[#A3A7AA] text-xs p-6 text-left"
                  }
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((row: { [key: string]: any }, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={`${dividers ? "" : "border-none"}`}
                >
                  {tableColumns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={`${
                        dividers
                          ? ""
                          : "border-none text-xs font-semibold text-[#898989] text-nowrap"
                      }`}
                    >
                      <div
                        className={`w-fit ${
                          typeof column.cellClassName === "function"
                            ? column.cellClassName(row)
                            : column.cellClassName ?? ""
                        } ${
                          column.render
                            ? "flex gap-2 px-4 py-4 space-x-4"
                            : "p-2 px-4 text-center"
                        }`}
                      >
                        {column.render ? column.render(row) : row[column.key]}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="text-center py-8 text-slate-500 font-semibold text-sm"
                >
                  <p>No data available</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Delete Card */}
      {showDelete && (
        <DeleteCard
          title="Delete PTO"
          message="Are you sure you want to delete this PTO?"
          onDelete={() => {
            if (cellToDelete !== null) {
              handleDelete(cellToDelete);
            }
          }}
          onCancel={() => {
            setCellToDelete(null);
            if (setShowDelete) {
              setShowDelete(false);
            }
          }}
          isDeleting={isDeleteLoading}
        />
      )}
    </div>
  );
}
