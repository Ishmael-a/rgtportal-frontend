// import StepProgress from "@/components/StepProgress";
import DepartmentCard from "@/components/DepartmentCard";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const Departments = () => {
  const { departments } = useSelector((state: RootState) => state.sharedState);
  console.log("departments:", departments);
  return (
    <main className="p-4">
      <header className="text-[#706D8A] font-semibold text-3xl">
        All Departments
      </header>

      <section className="pt-6 flex flex-wrap gap-4 justify-center sm:justify-start ">
        {departments.map((item, index) => (
          <DepartmentCard {...item} key={index} />
        ))}
      </section>

      {/* <section className=" mt-5 flex justify-center items-center"> */}
      {/* <StepProgress /> */}
      {/* </section> */}
    </main>
  );
};

export default Departments;
