import React, { useState } from "react";
import { Column } from "@/types/tables";
import { DataTable } from "../../common/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { SideModal } from "@/components/ui/side-dialog";
import ConfirmCancelModal from "@/components/common/ConfirmCancelModal";
import { PtoLeave } from "@/types/PTOS";
import ViewIcon from "@/assets/icons/ViewIcon";
import Avtr from "@/components/Avtr";
import { useRequestPto } from "@/hooks/usePtoRequests";
import Filters, { FilterConfig } from "@/components/common/Filters";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useAuthContextProvider } from "@/hooks/useAuthContextProvider";

export enum PtoStatusType {
  PENDING = "pending",
  HR_APPROVED = "approved",
  HR_DECLINED = "declined",
  MANAGER_APPROVED = "manager_approved",
  MANAGER_DECLINED = "manager_declined",
}

export const statusTextMap = {
  [PtoStatusType.MANAGER_APPROVED]: "Approved by Manager",
  [PtoStatusType.MANAGER_DECLINED]: "Declined by Manager",
  [PtoStatusType.HR_APPROVED]: "Approved by HR",
  [PtoStatusType.HR_DECLINED]: "Declined by HR",
  [PtoStatusType.PENDING]: "Pending",
};

export interface timeOffManagementTableProps {
  initialData: PtoLeave[] | undefined;
  filters?: FilterConfig[];
  onReset?: () => void;
  isDataLoading: boolean;
  pageSize?: number;
}

export interface FilterState {
  type: string;
  status: string;
  selectedDate?: Date | null;
  searchQuery: string;
}

const EmployeeTimeOffManagementTable: React.FC<timeOffManagementTableProps> = ({
  initialData,
  filters,
  onReset,
}) => {
  const { currentUser } = useAuthContextProvider();
  const departmentId = currentUser?.employee?.departmentId as number;

  const [selectedEmployee, setSelectedEmployee] = useState<PtoLeave | null>(
    null
  );
  const [rejectModalOpen, setRejectModalOpen] = React.useState<boolean>(false);
  const [approveModalOpen, setApproveModalOpen] =
    React.useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reason, setReason] = React.useState<string>("");
  const { updatePto, isPtoUpdating } = useRequestPto();
  const { departments } = useSelector((state: RootState) => state.sharedState);

  const isManager =
    departments.find((department) => department.id === String(departmentId))
      ?.managerId === currentUser?.employee?.id;

  const isHr = currentUser?.role.name === "HR";

  const shouldDisableButtons = (selectedEmployee: PtoLeave | null): boolean => {
    if (!selectedEmployee || !currentUser) return false;

    const isCurrentUserEmployee =
      selectedEmployee.employee?.id === currentUser.employee?.id;
    return (isManager || isHr) && isCurrentUserEmployee;
  };

  const handleOpenApproveModal = () => {
    setApproveModalOpen(true);
    return;
  };

  const handleOpentRejectModal = () => {
    setRejectModalOpen(true);
    return;
  };

  const handleApprove = async (): Promise<void> => {
    try {
      if (selectedEmployee && selectedEmployee.id) {
        const updatedPto = {
          statusReason: selectedEmployee.statusReason,
          status: PtoStatusType.MANAGER_APPROVED,
          departmentId: Number(selectedEmployee.departmentId),
        };
        await updatePto({ ptoUpdate: updatedPto, ptoId: selectedEmployee.id });
        setApproveModalOpen(false);
      }
    } catch (error) {
      console.error("Error approving request", error);
      setApproveModalOpen(false);
    }
  };

  const handleReject = async (): Promise<void> => {
    try {
      if (selectedEmployee && selectedEmployee.id) {
        const updatedPto = {
          statusReason: reason,
          status: PtoStatusType.MANAGER_DECLINED,
          departmentId: Number(selectedEmployee.departmentId),
        };
        await updatePto({ ptoUpdate: updatedPto, ptoId: selectedEmployee.id });
        setRejectModalOpen(false);
        setReason("");
      }
    } catch (error) {
      console.error("Error rejecting request", error);
      setRejectModalOpen(false);
    }
  };

  const formattedData = initialData?.map((item) => ({
    ...item,
    from: format(new Date(item.startDate), "dd MMM yyyy"),
    to: format(new Date(item.endDate), "dd MMM yyyy"),
    status:
      statusTextMap[(item.status as PtoStatusType) ?? PtoStatusType.PENDING],
    total: `${Math.ceil(
      (new Date(item.endDate as Date).getTime() -
        new Date(item.startDate as Date).getTime()) /
        (1000 * 60 * 60 * 24)
    )} days`,
  }));

  const columns: Column[] = [
    {
      key: "employeeName",
      header: "Employee Name",
      render: (row) => (
        <div className="flex items-center gap-1">
          {row && (
            <>
              <Avtr
                name={row.employee?.user?.username}
                url={row.employee?.user?.profileImage}
              />
              <div>
                <p className="text-[#8A8A8C] font-semibold ">
                  {row.employee?.user?.username}
                </p>
                <p className="font-[400]">{row.employee?.user?.email}</p>
              </div>
            </>
          )}
        </div>
      ),
    },
    {
      key: "from",
      header: "From",
    },
    {
      key: "to",
      header: "To",
    },
    {
      key: "total",
      header: "Total",
    },
    {
      key: "reason",
      header: "Reason",
    },
    {
      key: "status",
      header: "Status",
      cellClassName: (row) => {
        const lowerCase = row.status.toLowerCase();
        console.log("lower:", lowerCase);
        return `py-2 px-4 text-center rounded-md ${
          lowerCase.includes("approved")
            ? "bg-[#DFFFC7] text-[#20E42A]"
            : lowerCase.includes("declined")
            ? "bg-[#FEE4E2] text-[#D92D20]"
            : "bg-yellow-100 text-yellow-800"
        }`;
      },
    },
    {
      key: "view",
      header: "Action",
      render: (row) => (
        <div className="w-full flex pl-3">
          <div
            className="bg-rgtpink rounded-[7.37px] cursor-pointer hover:bg-pink-500 transition-all duration-300 ease-in"
            onClick={() => {
              setIsModalOpen(true);
              setSelectedEmployee(row as PtoLeave);
            }}
          >
            <ViewIcon />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className=" flex bg-white flex-col items-center h[340px] overflow-auto">
        {/* Filter Section */}
        <div className="px-[22px] w-full">
          {filters && onReset && (
            <Filters filters={filters} onReset={onReset} />
          )}
        </div>

        <DataTable columns={columns} data={formattedData} actionBool={false} />

        {/* <div className="mt-4 flex justify-center ">
          <StepProgress
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(filteredEmployees?.length ?? 0 / pageSize)}
          />
        </div> */}
      </div>

      <ConfirmCancelModal
        isOpen={rejectModalOpen}
        onOpenChange={setRejectModalOpen}
        title="Are you sure you want to reject?"
        onSubmit={handleReject}
        onCancel={() => {
          setRejectModalOpen(false);
        }}
        isSubmitting={isPtoUpdating}
      >
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Provide a Reason</p>
          <Textarea
            className="w-full"
            rows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason here..."
          />
          <p className="text-xs text-gray-400">
            We can't let you go at the moment
          </p>
        </div>
      </ConfirmCancelModal>

      <ConfirmCancelModal
        isOpen={approveModalOpen}
        onOpenChange={setApproveModalOpen}
        title="Are you sure you want to approve?"
        onSubmit={handleApprove}
        onCancel={() => {
          setRejectModalOpen(false);
        }}
        isSubmitting={isPtoUpdating}
      />

      <SideModal
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
        title="Approve Or Reject Request"
        showCloseButton={false}
        headerClassName="w-full flex justify-center text-[#706D8A]"
        className="flex flex-col items-center sm:w-1/2"
        footerClassName="w-full p-0 h-full flex"
        footerContent={
          <div className="w-full flex justify-center items-end gap-4">
            <Button
              variant={"ghost"}
              className={`w-1/2 py-7 border-1 border-[#FF0000] text-[#FF0000] hover:text-[#FF0000] cursor-pointer transition-all duration-300 ease-in disabled:opacity-40`}
              disabled={shouldDisableButtons(selectedEmployee)}
              onClick={handleOpentRejectModal}
            >
              Reject
            </Button>
            <Button
              variant={"secondary"}
              className="w-1/2 py-7 bg-[#DFFFC7] text-[#15FF00] cursor-pointer transition-all duration-300 ease-in hover:text-[#15FF00] hover:bg-[#DFFFC7] disabled:opacity-40"
              onClick={handleOpenApproveModal}
              disabled={shouldDisableButtons(selectedEmployee)}
            >
              Approve
            </Button>
          </div>
        }
      >
        <div className=" p-6 flex flex-col ">
          {/* Employee Name */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">Employee Name</label>
            <Input
              value={selectedEmployee?.employee?.user?.username}
              readOnly
              className="h-12 rounded-lg text-gray-400 mt-1 bg-gray-100 border-none shadow-none"
            />
          </div>

          {/* Date Fields */}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="text-sm text-gray-300">From</label>
              <div className="relative">
                <Input
                  value={format(
                    new Date(selectedEmployee?.startDate ?? new Date()),
                    "dd MMM yyyy"
                  )}
                  readOnly
                  className="h-12 rounded-lg text-gray-400 mt-1 bg-gray-100 pr-10 border-none shadow-none"
                />
              </div>
            </div>

            <div className="w-1/2">
              <label className="text-sm text-gray-300">To</label>
              <div className="relative">
                <Input
                  value={format(
                    new Date(selectedEmployee?.endDate ?? new Date()),
                    "dd MMM yyyy"
                  )}
                  readOnly
                  className="h-12 rounded-lg text-gray-400 mt-1 bg-gray-100  pr-10 border-none shadow-none"
                />
              </div>
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="text-sm text-gray-300">Reason</label>
            <Textarea
              value={selectedEmployee?.reason}
              readOnly
              className="h-28 rounded-lg text-gray-400 mt-1 bg-gray-100 border-none shadow-none"
            />
          </div>
          <div className="pt-4">
            <label className="text-sm text-gray-300">Manager Reason</label>
            <Input
              value={selectedEmployee?.statusReason}
              readOnly
              className="h-12 rounded-lg text-gray-400 mt-1 bg-gray-100 border-none shadow-none"
            />
          </div>
        </div>
      </SideModal>
    </>
  );
};

export default EmployeeTimeOffManagementTable;
