import ArrowIcon from "@/assets/icons/ArrowIcon";
import ViewIcon from "@/assets/icons/ViewIcon";
import Avtr from "@/components/Avtr";
import { DataTable } from "@/components/common/DataTable";
import Filters from "@/components/common/Filters";
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

  useEffect(() => {
    const department = departments.find((item) => item.id === Number(id));

    if (!department) {
      return;
    }

    setDetails(department);
  }, [id, departments]);

  if (!details) {
    return <div>No data</div>;
  }


  const transformedData = details.employees.map((employee) => ({
    username: employee.user.username || "N/A",
    email: employee.user.email || "N/A",
    type: employee.employeeType || "N/A",
    userType: employee.user.role.name.toUpperCase() || "N/A",
    positionStatus: !employee.leaveType ? "Permanent" : "Nsp",
    ptoRequest: employee.leaveType ? "Active" : "Inactive",
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
                className={`font-semibold w-[182px] h-[30px] flex justify-center items-center rounded-[4.91px] ${
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
    },

    {
      key: "pto request",
      header: "PTO Request",
      render: (row) => (
        <>
          {row && (
            <div className="flex items-center gap-2">
              <p
                className={`font-semibold text-xs rounded-[6px] h-[30px] flex items-center justify-center ${
                  row.ptoRequest.toLowerCase() === "active"
                    ? "bg-[#DFFFC7] w-[141.9px] text-confirmgreen"
                    : "bg-[#FEE4E2] w-[182px] text-[#FF4A55] "
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
    },
  ];

  return (
    <main className="space-y-10 w-full f">
      <header className="">
        <h3 className="text-[#706D8A] font-semibold text-[30px]">
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

      <div
        className="w-full flex justify-center sm:block bg-white rounded-md shadow-sm"
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE and Edge */,
        }}
      >
        <style>
          {`
                .hide-scrollbar::-webkit-scrollbar {
                display: none; /* Chrome, Safari, and Opera */
              }
              `}
        </style>

        <div className="py-[10px] px-[20px]">
          <Filters
            select_1_options={["Graphic Design", "Copywriter"]}
            select_2_options={["Manager", "Employee", "Marketing"]}
            select_1_placeholder="Department Role"
            select_2_placeholder="User Type"
          />
          <DataTable
            columns={columns}
            data={transformedData}
            actionBool={false}
          />
        </div>
      </div>
    </main>
  );
};

export default DepartmentDetails;
