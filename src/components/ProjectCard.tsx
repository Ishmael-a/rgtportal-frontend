import { NavLink } from "react-router-dom";
import Avtr from "./Avtr";
import { IProjectCard } from "@/types/employee";

const ProjectCard: React.FC<IProjectCard> = ({
  members,
  name,
  leadName,
  id,
  // path
}) => {
  const maxVisible = 3; // Show up to 3 avatars before the "+X" indicator
  const extraCount = members.length - maxVisible;

  console.log("members:", members);
  const totalMembers = members.length;

  return (
    <div className="flex flex-col space-y-2 bg-white rounded-md p-2 md:min-w-64 shadow-md hover:shadow-gray-400 transition-all duration-300 ease-in ">
      <div className="pb-4 border-b-[1px]  border-gray-100">
        <header className="text-[#706D8A] text-[21.56px] font-semibold flex justify-between items-start">
          <p className="w-44 text-nowrap truncate">{name}</p>
          <NavLink to={`all-projects/${id}`}>
            <img
              src="/Down 2.svg"
              className="-rotate-90 hover:bg-slate-200 transition-colors duration-300 ease-in rounded-full p-1"
            />
          </NavLink>
        </header>
        <div className="flex ">
          <div>
            {leadName && (
              <p className=" text-[#C0AFFF]">{leadName}-Team Lead</p>
            )}
            <p className="text-[#A2A1A8] text-sm">{totalMembers} Members</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="relative w-[80px] h-10">
          {members.slice(0, maxVisible).map((member, index) => (
            <Avtr
              key={index}
              index={index}
              url={member.avtr.url}
              name={member.avtr.fallBack}
              className="w-9 h-9 rounded-full absolute border-[#C0AFFF] border-3"
            />
          ))}

          {extraCount > 0 && (
            <div
              className="absolute flex items-center justify-center w-9 h-9 text-xs font-bold text-white bg-[#C0AFFF] rounded-full border-0"
              style={{ left: `${maxVisible * 24}px`, zIndex: "200" }}
            >
              +{extraCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
