import Avtr from "@/components/Avtr";
import { projectCards } from "@/constants";
import { IProjectCard } from "@/types/employee";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [details, setDetails] = useState<IProjectCard | null>(null);

  useEffect(() => {
    const project = projectCards.find((item) => item.id === Number(id));

    if (!project) {
      return;
    }

    setDetails(project);
  }, [id]);

  return (
    <main className="space-y-10 w-full">
      {/* header with back functionality */}
      <header className="">
        <h3 className="text-[#706D8A] font-semibold text-[30px]">
          {details?.projectName}
        </h3>
        <div className="flex items-center">
          <p
            className="text-[#AEB1B7] text-sm font-semibold cursor-pointer"
            onClick={() => navigate(-1)}
          >
            All Projects
          </p>
          <img src="/Down 2.svg" className="-rotate-90" />
          <p className="text-[#79797E] text-sm font-semibold">
            {details?.projectName}
          </p>
        </div>
      </header>

      {/* main section */}

      <div
        className=" max-w-80 sm:max-w-full p-3 bg-white rounded-md shadow-sm overflow-scroll"
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
            {details?.members.map((item, index) => (
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
      </div>
    </main>
  );
};

export default ProjectDetails;
