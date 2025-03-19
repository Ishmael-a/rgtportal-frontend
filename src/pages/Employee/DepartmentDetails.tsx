import ArrowIcon from "@/assets/icons/ArrowIcon";
import ViewIcon from "@/assets/icons/ViewIcon";
import Avtr from "@/components/Avtr";
import { DataTable } from "@/components/common/DataTable";
import Filters, { FilterConfig } from "@/components/common/Filters";
import { RootState } from "@/state/store";
import { IDepartmentCard } from "@/types/employee";
import { Column } from "@/types/tables";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const DepartmentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { departments } = useSelector((state: RootState) => state.sharedState);

  const [details, setDetails] = useState<IDepartmentCard | null>(null);
  const [selectedWorkType, setSelectedWorkType] =
    useState<string>("Work Types");
  const [selectedUserType, setSelectedUserType] =
    useState<string>("All User Types");
  const [selectStatus, setSelectStatus] = useState<string>("Permanent");

  useEffect(() => {
    const department = departments.find((item) => item.id === id);

    if (!department) {
      return;
    }

    setDetails(department);
  }, [id, departments]);

  const transformedData = details?.employees.map((employee) => ({
    username: employee.user.username || "N/A",
    email: employee.user.email || "N/A",
    type: employee.employeeType || "N/A",
    userType: employee.user.role.name.toUpperCase() || "N/A",
    positionStatus: !employee.position ? "Permanent" : "Nsp",
    ptoRequest: employee.leaveType ? "Inactive" : "Active",
    profileImage: employee.user.profileImage,
  }));

  const columns: Column[] = [
    {
      key: "username",
      header: "Employee Name",
      render: (row) => (
        <div className="flex items-center gap-1">
          {row && (
            <>
              <Avtr name={row.username} url={row.profileImage} />
              <div>
                <p>{row.username}</p>
                <p>{row.email}</p>
              </div>
            </>
          )}
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
    },
    {
      key: "userType",
      header: "User Type",
    },
    {
      key: "positionStatus",
      header: "Position Status",
      render: (row) => {
        const lowerCase = row.positionStatus.toLowerCase();
        return (
          <div>
            {row && (
              <div
                className={`font-semibold w-[182px] custom1:w-[195px] h-[30px] flex justify-center items-center rounded-[4.91px] ${
                  lowerCase === "nsp"
                    ? "bg-[#FFF7D8] text-rgtyellow"
                    : "bg-[#C9ADFF] text-[#6418C3]"
                }`}
              >
                {row.positionStatus}
              </div>
            )}
          </div>
        );
      },
      cellClassName: () => "position-status-cell",
    },
    {
      key: "pto request",
      header: "PTO Request",
      render: (row) => (
        <>
          {row && (
            <div className="flex items-center gap-2 ">
              <p
                className={`font-semibold text-xs rounded-[6px] h-[30px] flex items-center justify-center ${
                  row.ptoRequest.toLowerCase() === "active"
                    ? "bg-[#DFFFC7] w-[182px] text-confirmgreen"
                    : "bg-[#FEE4E2] md:w-[240px] text-[#FF4A55] "
                }`}
              >
                {row.ptoRequest}
              </p>
              {row.ptoRequest.toLowerCase() === "active" && (
                <div className="bg-rgtpink rounded-[7.37px] cursor-pointer hover:bg-pink-500 transition-all duration-300 ease-in">
                  <ViewIcon />
                </div>
              )}
            </div>
          )}
        </>
      ),
      cellClassName: () => "pto-request-cell",
    },
  ];

  const handleResetFilters = () => {
    setSelectedWorkType("Work Types");
    setSelectedUserType("All User Types");
    setSelectStatus("Position Status");
  };

  const filters: FilterConfig[] = [
    {
      type: "select",
      options: ["Work Types", "full_time", "part_time"],
      value: selectedWorkType,
      onChange: setSelectedWorkType,
    },
    {
      type: "select",
      options: ["All User Types", "Manager", "Employee", "Marketer"],
      value: selectedUserType,
      onChange: setSelectedUserType,
    },
    {
      type: "select",
      options: ["Position Status", "Permanent", "Nsp"],
      value: selectStatus,
      onChange: setSelectStatus,
    },
  ];

  const filteredData = transformedData?.filter((employee) => {
    const workTypes =
      selectedWorkType === "Work Types" ||
      employee.type.toLowerCase() === selectedWorkType.toLowerCase();

    const userTypeMatch =
      selectedUserType === "All User Types" ||
      employee.userType.toLowerCase() === selectedUserType.toLowerCase();

    const status =
      selectedWorkType === "Position Status" ||
      employee.positionStatus.toLowerCase() === selectStatus.toLowerCase();

    return workTypes && userTypeMatch && status;
  });

  return (
    <main className="space-y-2 w-full f">
      <header className="">
        <h3 className="text-[#706D8A] font-semibold text-xl">
          {details?.name}
        </h3>
        <div className="flex items-center">
          <p
            className="text-[#AEB1B7] text-sm font-semibold cursor-pointer"
            onClick={() => navigate(-1)}
          >
            All Projects
          </p>
          <ArrowIcon className="-rotate-90" />
          <p className="text-[#79797E] text-sm font-semibold">
            {details?.name}
          </p>
        </div>
      </header>

      {details ? (
        <div
          className="w-full flex justify-center sm:block bg-white rounded-md shadow-sm mt-5"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>
            {`
                .hide-scrollbar::-webkit-scrollbar {
                display: none; /* Chrome, Safari, and Opera */
              }
              `}
          </style>

          <div className="py-[10px] px-[20px] w-full">
            <Filters filters={filters} onReset={handleResetFilters} />
            <DataTable
              columns={columns}
              data={filteredData || []}
              actionBool={false}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-gray-200 h-screen flex justify-center items-center text-rgtpurple font-semibold">
          <p>No data available</p>
        </div>
      )}
    </main>
  );
};

export default DepartmentDetails;
