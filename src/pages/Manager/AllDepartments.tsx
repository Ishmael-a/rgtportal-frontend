import Header from "@/components/common/Header";
import ProjectCard from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { projectCards } from "@/constants";
import { Search } from "lucide-react";

const AllDepartments = () => {
  return (
    <main>
      <Header
        title="All Departments"
        description="These are all current Departments"
      >
        <div className="flex justify-between items-center bg-white rounded-md p-2 mr-3">
          <Input
            className="border-0 shadow-none bg-white focus:outline-none focus:ring-0"
            placeholder="Search for a Department"
          />
          <Search />
        </div>
      </Header>

      <section>
        {projectCards.map((item, index) => (
          <ProjectCard name={item.name} members={item.members} id={index} />
        ))}
      </section>
    </main>
  );
};

export default AllDepartments;
