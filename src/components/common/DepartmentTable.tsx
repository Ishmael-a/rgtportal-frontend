import { IProjectCard } from "@/types/employee";
import Avtr from "../Avtr";

const DepartmentTable = ({ details }: { details: IProjectCard | null }) => {
  return (
    <main>
      <table className="min-w-full border-collapse rounded-lg overflow-hidden">
        {/* Table Head */}
        <thead>
          <tr className=" text-gray-700 text-left">
            <th className="text-[#A3A7AA] font-semibold text-sm p-3 md:pl-16">
              Assigned To
            </th>
            <th className="text-[#A3A7AA] font-semibold text-sm p-3">
              Department
            </th>
            <th className="text-[#A3A7AA] font-semibold text-sm p-3">Role</th>
            <th className="p-3 text-center text-[#A3A7AA] font-semibold text-sm ">
              Action
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {details &&
            details?.members.map((item, index) => (
              <tr
                key={index}
                className=" hover:bg-gray-50 transition-all space-y-3"
              >
                {/* Assigned To */}
                <td className="p-3 flex items-center gap-3">
                  <Avtr
                    url={item.avtr.url}
                    name={item.avtr.fallBack}
                    className="border-3 border-[#2186EB]"
                  />
                  <span className="text-sm font-semibold text-[#8A8A8C] text-nowrap">
                    {item.name}
                  </span>
                </td>

                {/* Department */}
                <td className="p-3">
                  <span className="px-2 text-nowrap py-1 bg-green-100 text-[#039855] text-sm font-light rounded">
                    {item.department}
                  </span>
                </td>

                {/* Role */}
                <td className="p-3">
                  <span className="px-2 py-1 text-nowrap bg-green-100 text-[#039855] text-sm font-light rounded">
                    {item.role}
                  </span>
                </td>

                {/* Action */}
                <td className="p-3 text-center">
                  <button className="cursor-pointer">
                    <img
                      src="/Delete.svg"
                      className="p-1 bg-red-600 hover:bg-red-700 rounded-md"
                    />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!details && (
        <div className="w-full flex justify-center items-center p-3">
          <p className="text-slate-500 font-semibold text-sm">
            No Data available
          </p>
        </div>
      )}
    </main>
  );
};

export default DepartmentTable;
