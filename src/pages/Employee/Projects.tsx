import ProjectCard from "@/components/ProjectCard";
import StepProgress from "@/components/StepProgress";
import { projectCards } from "@/constants";

const Projects = () => {
  return (
    <main className="p-4">
      <header className="text-[#706D8A] font-semibold text-3xl">
        All Projects
      </header>

      <section className="pt-6 flex flex-wrap gap-4 ">
        {projectCards.map((item, index) => (
          <ProjectCard {...item} key={index} />
        ))}
      </section>

      <section className=" mt-5 flex justify-center items-center">
        <StepProgress />
      </section>
    </main>
  );
};

export default Projects;


