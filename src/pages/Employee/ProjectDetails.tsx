import DepartmentTable from "@/components/common/DepartmentTable";
import { projectCards } from "@/constants";
import { IProjectCard, IProjectType } from "@/types/employee";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id:", id);

  const [details, setDetails] = useState<IProjectType | null>(null);

  useEffect(() => {
    const project = projectCards.find((item) => item.id === Number(id));

    if (!project) {
      return;
    }

    setDetails(project);
  }, [id]);

  return (
    <main className="space-y-10 w-full f">
      {/* header with back functionality */}
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
          <img src="/Down 2.svg" className="-rotate-90" />
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

        <DepartmentTable details={details} />
      </div>
    </main>
  );
};

export default ProjectDetails;
